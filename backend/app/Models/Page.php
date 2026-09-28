<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use Auditable, HasFactory, HasUlids, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'template', 'excerpt', 'status', 'is_homepage',
        'show_in_navigation', 'sort_order', 'published_at', 'scheduled_at',
        'seo_data', 'created_by', 'updated_by', 'published_by',
    ];

    protected function casts(): array
    {
        return [
            'is_homepage' => 'boolean',
            'show_in_navigation' => 'boolean',
            'seo_data' => 'array',
            'published_at' => 'datetime',
            'scheduled_at' => 'datetime',
        ];
    }

    public function blocks()
    {
        return $this->hasMany(PageBlock::class)->orderBy('sort_order');
    }

    public function activeBlocks()
    {
        return $this->hasMany(PageBlock::class)->where('is_active', true)->orderBy('sort_order');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function seo()
    {
        return $this->morphOne(SeoSetting::class, 'seoable');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

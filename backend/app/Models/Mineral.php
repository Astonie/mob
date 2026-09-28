<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mineral extends Model
{
    use Auditable, HasFactory, HasUlids, SoftDeletes;

    protected $fillable = [
        'name', 'slug', 'chemical_symbol', 'category', 'summary', 'description',
        'uses', 'properties', 'importance', 'color', 'featured_image',
        'is_featured', 'is_active', 'sort_order', 'status', 'published_at',
        'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'properties' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'mineral_project')
            ->withPivot('is_primary', 'sort_order')
            ->withTimestamps();
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')->whereNotNull('published_at');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use Auditable, HasFactory, HasUlids, SoftDeletes;

    protected $fillable = [
        'name', 'slug', 'code', 'summary', 'description', 'location_id',
        'country', 'region', 'latitude', 'longitude', 'status', 'stage',
        'project_type', 'ownership_percentage', 'ownership_structure',
        'start_date', 'end_date', 'production_info', 'production_data',
        'esg_data', 'is_featured', 'is_active', 'sort_order',
        'content_status', 'published_at', 'scheduled_at', 'created_by', 'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'production_data' => 'array',
            'esg_data' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'start_date' => 'date',
            'end_date' => 'date',
            'published_at' => 'datetime',
            'scheduled_at' => 'datetime',
        ];
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function minerals()
    {
        return $this->belongsToMany(Mineral::class, 'mineral_project')
            ->withPivot('is_primary', 'sort_order');
    }

    public function primaryMinerals()
    {
        return $this->minerals()->wherePivot('is_primary', true);
    }

    public function documents()
    {
        return $this->morphMany(Document::class, 'documentable');
    }

    public function media()
    {
        return $this->morphMany(MediaAsset::class, 'mediable');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopePublished($query)
    {
        return $query->where('content_status', 'published')->whereNotNull('published_at');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

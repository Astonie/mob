<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Career extends Model
{
    use Auditable, HasFactory, HasUlids, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'department', 'location', 'location_id', 'employment_type',
        'experience_level', 'summary', 'description', 'requirements', 'qualifications',
        'benefits', 'salary_range', 'deadline', 'published_at', 'status', 'is_featured',
        'is_active', 'vacancies', 'created_by',
    ];

    protected function casts(): array
    {
        return [
            'deadline' => 'date',
            'published_at' => 'datetime',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function applications()
    {
        return $this->hasMany(CareerApplication::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeOpen($query)
    {
        return $query->where('status', 'open')->where('is_active', true)->where(function ($q) {
            $q->whereNull('deadline')->orWhere('deadline', '>=', now());
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

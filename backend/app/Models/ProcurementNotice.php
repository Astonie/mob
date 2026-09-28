<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProcurementNotice extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'reference_number', 'category', 'summary', 'description',
        'requirements', 'submission_instructions', 'procurement_type', 'estimated_value',
        'currency', 'published_at', 'deadline', 'closing_date', 'status', 'is_featured',
        'contact_email', 'contact_phone', 'documents', 'created_by',
    ];

    protected function casts(): array
    {
        return [
            'documents' => 'array',
            'estimated_value' => 'decimal:2',
            'published_at' => 'datetime',
            'deadline' => 'datetime',
            'closing_date' => 'datetime',
            'is_featured' => 'boolean',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
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

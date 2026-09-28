<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'description', 'category', 'type', 'version',
        'file_name', 'original_name', 'path', 'disk', 'mime_type', 'size',
        'publication_date', 'visibility', 'is_featured', 'is_active',
        'documentable_type', 'documentable_id', 'download_count', 'uploaded_by',
    ];

    protected function casts(): array
    {
        return [
            'publication_date' => 'date',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'size' => 'integer',
        ];
    }

    public function documentable()
    {
        return $this->morphTo();
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function scopePublic($query)
    {
        return $query->where('visibility', 'public');
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

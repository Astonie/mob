<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MediaAsset extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    protected $fillable = [
        'file_name', 'original_name', 'path', 'disk', 'mime_type', 'extension',
        'size', 'width', 'height', 'alt_text', 'caption', 'description',
        'folder', 'metadata', 'mediable_type', 'mediable_id', 'uploaded_by',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'width' => 'integer',
            'height' => 'integer',
            'size' => 'integer',
        ];
    }

    public function mediable()
    {
        return $this->morphTo();
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function getUrlAttribute(): string
    {
        return \Storage::disk($this->disk)->url($this->path);
    }

    public function scopeImages($query)
    {
        return $query->where('mime_type', 'like', 'image/%');
    }
}

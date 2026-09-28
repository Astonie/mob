<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EsgContent extends Model
{
    use HasFactory, HasUlids, SoftDeletes;

    protected $fillable = ['title', 'slug', 'category', 'summary', 'content', 'featured_image', 'metrics', 'sort_order', 'is_active', 'status', 'published_at'];

    protected function casts(): array
    {
        return ['metrics' => 'array', 'is_active' => 'boolean', 'published_at' => 'datetime'];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

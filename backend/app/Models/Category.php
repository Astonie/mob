<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = ['name', 'slug', 'type', 'description', 'color', 'sort_order', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function newsArticles()
    {
        return $this->hasMany(NewsArticle::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

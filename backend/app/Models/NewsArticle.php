<?php

namespace App\Models;

use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NewsArticle extends Model
{
    use Auditable, HasFactory, HasUlids, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'excerpt', 'content', 'content_blocks', 'category_id',
        'featured_image', 'gallery', 'status', 'is_featured', 'published_at',
        'scheduled_at', 'author_id', 'reviewed_by', 'published_by', 'views_count', 'seo_data',
    ];

    protected function casts(): array
    {
        return [
            'content_blocks' => 'array',
            'gallery' => 'array',
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
            'scheduled_at' => 'datetime',
            'seo_data' => 'array',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'article_tag');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function publisher()
    {
        return $this->belongsTo(User::class, 'published_by');
    }

    public function seo()
    {
        return $this->morphOne(SeoSetting::class, 'seoable');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')->where('published_at', '<=', now());
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoSetting extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'seoable_type', 'seoable_id', 'meta_title', 'meta_description',
        'canonical_url', 'og_title', 'og_description', 'og_image', 'og_type',
        'twitter_card', 'robots', 'structured_data', 'keywords',
    ];

    protected function casts(): array
    {
        return [
            'structured_data' => 'array',
            'keywords' => 'array',
        ];
    }

    public function seoable()
    {
        return $this->morphTo();
    }
}

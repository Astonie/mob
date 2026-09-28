<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageBlock extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = ['page_id', 'type', 'data', 'sort_order', 'is_active'];

    protected function casts(): array
    {
        return [
            'data' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}

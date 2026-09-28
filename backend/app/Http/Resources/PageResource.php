<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'template' => $this->template,
            'excerpt' => $this->excerpt,
            'status' => $this->status,
            'is_homepage' => $this->is_homepage,
            'published_at' => $this->published_at?->toIso8601String(),
            'blocks' => $this->whenLoaded('blocks', fn () => $this->blocks->map(fn ($b) => ['id' => $b->id, 'type' => $b->type, 'data' => $b->data, 'sort_order' => $b->sort_order])),
            'seo' => $this->whenLoaded('seo'),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}

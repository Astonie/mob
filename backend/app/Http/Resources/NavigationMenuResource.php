<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NavigationMenuResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'items' => $this->whenLoaded('items', fn () => $this->items->map(fn ($i) => self::formatItem($i))),
        ];
    }

    protected static function formatItem($item): array
    {
        return [
            'id' => $item->id, 'title' => $item->title, 'url' => $item->url, 'type' => $item->type, 'target' => $item->target,
            'children' => $item->children ? $item->children->map(fn ($c) => self::formatItem($c))->toArray() : [],
        ];
    }
}

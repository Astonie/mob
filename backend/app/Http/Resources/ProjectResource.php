<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'code' => $this->code,
            'summary' => $this->summary,
            'description' => $this->description,
            'country' => $this->country,
            'region' => $this->region,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'status' => $this->status,
            'stage' => $this->stage,
            'project_type' => $this->project_type,
            'ownership_percentage' => $this->ownership_percentage,
            'is_featured' => $this->is_featured,
            'is_active' => $this->is_active,
            'content_status' => $this->content_status,
            'published_at' => $this->published_at?->toIso8601String(),
            'location' => $this->whenLoaded('location', fn () => [
                'id' => $this->location->id,
                'name' => $this->location->name,
                'slug' => $this->location->slug,
                'country' => $this->location->country,
            ]),
            'minerals' => MineralResource::collection($this->whenLoaded('minerals')),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MineralResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'chemical_symbol' => $this->chemical_symbol,
            'category' => $this->category,
            'summary' => $this->summary,
            'description' => $this->description,
            'uses' => $this->uses,
            'properties' => $this->properties,
            'importance' => $this->importance,
            'is_featured' => $this->is_featured,
            'projects_count' => $this->whenCounted('projects'),
            'projects' => ProjectResource::collection($this->whenLoaded('projects')),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}

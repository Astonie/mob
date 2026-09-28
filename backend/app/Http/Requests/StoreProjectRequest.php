<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:projects,slug'],
            'code' => ['nullable', 'string', 'max:50'],
            'summary' => ['nullable', 'string', 'max:1000'],
            'description' => ['nullable', 'string'],
            'location_id' => ['nullable', 'ulid', 'exists:locations,id'],
            'country' => ['nullable', 'string', 'max:100'],
            'region' => ['nullable', 'string', 'max:100'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'status' => ['nullable', 'string', 'in:exploration,development,operation,care_and_maintenance,closed'],
            'stage' => ['nullable', 'string', 'max:50'],
            'project_type' => ['nullable', 'string', 'max:50'],
            'ownership_percentage' => ['nullable', 'string', 'max:50'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'content_status' => ['nullable', 'string', 'in:draft,review,approved,published,archived,scheduled'],
            'minerals' => ['nullable', 'array'],
            'minerals.*' => ['ulid', 'exists:minerals,id'],
            'published_at' => ['nullable', 'date'],
            'scheduled_at' => ['nullable', 'date'],
        ];
    }
}

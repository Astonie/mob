<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $projectId = $this->route('project')?->id ?? $this->route('project');

        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'string', 'max:255', Rule::unique('projects', 'slug')->ignore($projectId)],
            'code' => ['nullable', 'string', 'max:50'],
            'summary' => ['nullable', 'string', 'max:1000'],
            'description' => ['nullable', 'string'],
            'location_id' => ['nullable', 'ulid', 'exists:locations,id'],
            'country' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', 'string', 'in:exploration,development,operation,care_and_maintenance,closed'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
            'content_status' => ['nullable', 'string', 'in:draft,review,approved,published,archived,scheduled'],
            'minerals' => ['nullable', 'array'],
            'minerals.*' => ['ulid', 'exists:minerals,id'],
        ];
    }
}

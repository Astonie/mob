<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNewsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'unique:news_articles,slug'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['nullable', 'string'],
            'category_id' => ['nullable', 'ulid', 'exists:categories,id'],
            'featured_image' => ['nullable', 'string', 'max:500'],
            'status' => ['nullable', 'string', 'in:draft,review,approved,published,archived,scheduled'],
            'is_featured' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
            'scheduled_at' => ['nullable', 'date'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['ulid', 'exists:tags,id'],
        ];
    }
}

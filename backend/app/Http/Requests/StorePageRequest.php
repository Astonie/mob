<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'unique:pages,slug'],
            'template' => ['nullable', 'string', 'max:100'],
            'excerpt' => ['nullable', 'string', 'max:1000'],
            'status' => ['nullable', 'string', 'in:draft,review,approved,published,archived,scheduled'],
            'is_homepage' => ['nullable', 'boolean'],
            'blocks' => ['nullable', 'array'],
            'blocks.*.type' => ['required', 'string'],
            'blocks.*.data' => ['required', 'array'],
            'blocks.*.sort_order' => ['nullable', 'integer'],
        ];
    }
}

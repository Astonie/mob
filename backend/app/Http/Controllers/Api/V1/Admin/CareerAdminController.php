<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Career;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CareerAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = Career::query()->latest();
        if ($request->filled('search')) {
            $q->where('title', 'like', '%'.$request->string('search').'%');
        }
        if ($request->filled('status')) {
            $q->where('status', $request->string('status'));
        }

        return $q->paginate(min($request->integer('per_page', 15), 100));
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        $data['created_by'] = $request->user()->id;
        if ($data['status'] === 'open' && empty($data['published_at'])) {
            $data['published_at'] = now();
        }
        $career = Career::create($data);

        return response()->json(['data' => $career], 201);
    }

    public function show(Career $career)
    {
        return response()->json(['data' => $career]);
    }

    public function update(Request $request, Career $career)
    {
        $data = $this->validated($request);
        unset($data['slug'], $data['created_by']);
        if ($data['status'] ?? null) {
            $data['published_at'] = $data['published_at'] ?? $career->published_at ?? (in_array($data['status'], ['open']) ? now() : null);
        }
        $career->update($data);

        return response()->json(['data' => $career]);
    }

    public function destroy(Career $career)
    {
        $career->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:191'],
            'slug' => ['sometimes', 'string', 'max:191', 'unique:careers,slug'],
            'department' => ['nullable', 'string', 'max:100'],
            'location' => ['nullable', 'string', 'max:100'],
            'employment_type' => ['sometimes', 'in:full_time,part_time,contract,internship'],
            'experience_level' => ['nullable', 'string', 'max:50'],
            'summary' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'requirements' => ['nullable', 'string'],
            'qualifications' => ['nullable', 'string'],
            'benefits' => ['nullable', 'string'],
            'salary_range' => ['nullable', 'string', 'max:100'],
            'deadline' => ['nullable', 'date'],
            'published_at' => ['nullable', 'date'],
            'status' => ['sometimes', 'in:draft,open,closed,archived'],
            'is_featured' => ['sometimes', 'boolean'],
            'is_active' => ['sometimes', 'boolean'],
            'vacancies' => ['sometimes', 'integer', 'min:1'],
        ]);
    }
}

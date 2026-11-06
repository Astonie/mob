<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\EsgContent;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EsgAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = EsgContent::query()->orderBy('sort_order')->latest();
        if ($request->filled('search')) {
            $q->where(function ($query) use ($request) {
                $query->where('title', 'like', '%'.$request->string('search').'%')
                    ->orWhere('category', 'like', '%'.$request->string('search').'%');
            });
        }

        return $q->paginate(min($request->integer('per_page', 15), 100));
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        $esg = EsgContent::create($data);

        return response()->json(['data' => $esg], 201);
    }

    public function show(EsgContent $esgContent)
    {
        return response()->json(['data' => $esgContent]);
    }

    public function update(Request $request, EsgContent $esgContent)
    {
        $data = $this->validated($request);
        unset($data['slug']);
        $esgContent->update($data);

        return response()->json(['data' => $esgContent]);
    }

    public function destroy(EsgContent $esgContent)
    {
        $esgContent->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:191'],
            'slug' => ['sometimes', 'string', 'max:191', 'unique:esg_contents,slug'],
            'category' => ['required', 'string', 'max:50'],
            'summary' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'featured_image' => ['nullable', 'string', 'max:500'],
            'metrics' => ['nullable', 'array'],
            'sort_order' => ['sometimes', 'integer'],
            'is_active' => ['sometimes', 'boolean'],
            'status' => ['sometimes', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
        ]);
    }
}

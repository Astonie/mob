<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Resources\NewsResource;
use App\Models\NewsArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = NewsArticle::with(['category', 'author'])->latest();
        if ($request->filled('status')) {
            $q->where('status', $request->string('status'));
        }
        if ($request->filled('search')) {
            $q->where('title', 'like', '%'.$request->string('search').'%');
        }

        return NewsResource::collection($q->paginate($request->integer('per_page', 15)));
    }

    public function store(StoreNewsRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        $data['author_id'] = $request->user()->id;
        $tags = $data['tags'] ?? [];
        unset($data['tags']);
        $article = NewsArticle::create($data);
        if (! empty($tags)) {
            $article->tags()->sync($tags);
        }
        $article->load(['category', 'tags', 'author']);

        return new NewsResource($article);
    }

    public function show(NewsArticle $newsArticle)
    {
        $newsArticle->load(['category', 'tags', 'author']);

        return new NewsResource($newsArticle);
    }

    public function update(Request $request, NewsArticle $newsArticle)
    {
        $data = $request->validate(['title' => ['sometimes', 'string', 'max:255'], 'slug' => ['sometimes', 'string'], 'excerpt' => ['nullable', 'string'], 'content' => ['nullable', 'string'], 'category_id' => ['nullable', 'ulid', 'exists:categories,id'], 'status' => ['nullable', 'string'], 'is_featured' => ['nullable', 'boolean'], 'published_at' => ['nullable', 'date']]);
        $tags = $data['tags'] ?? null;
        unset($data['tags']);
        $newsArticle->update($data);
        if (is_array($tags)) {
            $newsArticle->tags()->sync($tags);
        }

        return new NewsResource($newsArticle->fresh()->load(['category', 'tags', 'author']));
    }

    public function destroy(NewsArticle $newsArticle)
    {
        $newsArticle->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function publish(Request $request, NewsArticle $newsArticle)
    {
        $newsArticle->update(['status' => 'published', 'published_at' => now(), 'published_by' => $request->user()->id]);

        return new NewsResource($newsArticle->fresh()->load(['category', 'tags']));
    }
}

<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsResource;
use App\Models\NewsArticle;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = NewsArticle::with(['category', 'tags', 'author'])
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->orderByDesc('published_at');

        if ($request->filled('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->string('category')));
        }
        if ($request->filled('tag')) {
            $query->whereHas('tags', fn ($q) => $q->where('slug', $request->string('tag')));
        }
        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }
        if ($request->filled('search')) {
            $s = '%'.$request->string('search').'%';
            $query->where(fn ($q) => $q->where('title', 'like', $s)->orWhere('excerpt', 'like', $s));
        }

        $news = $query->paginate($request->integer('per_page', 12))->withQueryString();

        return NewsResource::collection($news);
    }

    public function show(string $slug)
    {
        $article = NewsArticle::with(['category', 'tags', 'author', 'seo'])
            ->where('slug', $slug)->where('status', 'published')->firstOrFail();
        $article->increment('views_count');

        return new NewsResource($article);
    }
}

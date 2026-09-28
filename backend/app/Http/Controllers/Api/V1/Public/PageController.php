<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Models\Page;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::with('blocks')->where('status', 'published')->orderBy('sort_order')->get();

        return PageResource::collection($pages);
    }

    public function show(string $slug)
    {
        $page = Page::with(['blocks' => fn ($q) => $q->where('is_active', true)->orderBy('sort_order'), 'seo'])
            ->where('slug', $slug)->where('status', 'published')->firstOrFail();

        return new PageResource($page);
    }
}

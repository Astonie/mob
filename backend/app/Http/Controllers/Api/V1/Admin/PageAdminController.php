<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePageRequest;
use App\Http\Resources\PageResource;
use App\Models\Page;
use App\Models\PageBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = Page::with('blocks')->latest();
        if ($request->filled('search')) {
            $q->where('title', 'like', '%'.$request->string('search').'%');
        }

        return PageResource::collection($q->paginate($request->integer('per_page', 15)));
    }

    public function store(StorePageRequest $request)
    {
        $data = $request->validated();
        $blocks = $data['blocks'] ?? [];
        unset($data['blocks']);
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        $data['created_by'] = $request->user()->id;
        $page = Page::create($data);
        foreach ($blocks as $idx => $block) {
            $page->blocks()->create(['type' => $block['type'], 'data' => $block['data'], 'sort_order' => $block['sort_order'] ?? $idx]);
        }
        $page->load('blocks');

        return new PageResource($page);
    }

    public function show(Page $page)
    {
        $page->load('blocks');

        return new PageResource($page);
    }

    public function update(Request $request, Page $page)
    {
        $data = $request->validate(['title' => ['sometimes', 'string'], 'slug' => ['sometimes', 'string'], 'template' => ['nullable', 'string'], 'excerpt' => ['nullable', 'string'], 'status' => ['nullable', 'string']]);
        $page->update($data);
        if ($request->has('blocks')) {
            $page->blocks()->delete();
            foreach ($request->input('blocks') as $idx => $block) {
                $page->blocks()->create(['type' => $block['type'], 'data' => $block['data'], 'sort_order' => $block['sort_order'] ?? $idx]);
            }
        }
        $page->load('blocks');

        return new PageResource($page);
    }

    public function destroy(Page $page)
    {
        $page->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function reorder(Request $request, Page $page)
    {
        $request->validate(['blocks' => ['required', 'array'], 'blocks.*.id' => ['required', 'ulid', 'exists:page_blocks,id'], 'blocks.*.sort_order' => ['required', 'integer']]);
        foreach ($request->input('blocks') as $b) {
            PageBlock::where('id', $b['id'])->where('page_id', $page->id)->update(['sort_order' => $b['sort_order']]);
        }

        return new PageResource($page->fresh()->load('blocks'));
    }
}

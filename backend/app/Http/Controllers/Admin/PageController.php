<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::with('blocks')->latest()->paginate(20);
        return view('admin.pages.index', compact('pages'));
    }

    public function edit(Page $page)
    {
        $page->load('blocks');
        return view('admin.pages.edit', compact('page'));
    }

    public function update(Request $request, Page $page)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string'],
            'status' => ['required', 'string'],
            'excerpt' => ['nullable', 'string'],
            'blocks_json' => ['nullable', 'string'],
        ]);

        $page->update([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'status' => $data['status'],
            'excerpt' => $data['excerpt'] ?? null,
        ]);

        if (! empty($data['blocks_json'])) {
            $blocks = json_decode($data['blocks_json'], true);
            if (is_array($blocks)) {
                $page->blocks()->delete();
                foreach (array_values($blocks) as $idx => $b) {
                    $page->blocks()->create([
                        'type' => $b['type'] ?? 'rich_text',
                        'data' => $b['data'] ?? [],
                        'sort_order' => $b['sort_order'] ?? $idx,
                    ]);
                }
            }
        }

        return redirect()->route('admin.pages.edit', $page)->with('ok', 'Page saved.');
    }

    public function create()
    {
        return view('admin.pages.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string'],
        ]);
        $page = Page::create([
            'title' => $data['title'],
            'slug' => $data['slug'] ?? \Illuminate\Support\Str::slug($data['title']),
            'status' => 'draft',
            'created_by' => auth()->id(),
        ]);
        return redirect()->route('admin.pages.edit', $page);
    }

    public function destroy(Page $page)
    {
        $page->delete();
        return redirect()->route('admin.pages.index')->with('ok', 'Page deleted.');
    }
}

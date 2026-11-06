<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = Faq::query()->orderBy('sort_order')->latest();
        if ($request->filled('search')) {
            $q->where('question', 'like', '%'.$request->string('search').'%');
        }

        return $q->paginate(min($request->integer('per_page', 15), 100));
    }

    public function store(Request $request)
    {
        $faq = Faq::create($this->validated($request));

        return response()->json(['data' => $faq], 201);
    }

    public function show(Faq $faq)
    {
        return response()->json(['data' => $faq]);
    }

    public function update(Request $request, Faq $faq)
    {
        $faq->update($this->validated($request));

        return response()->json(['data' => $faq]);
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'question' => ['required', 'string', 'max:500'],
            'answer' => ['required', 'string'],
            'category' => ['sometimes', 'string', 'max:50'],
            'sort_order' => ['sometimes', 'integer'],
            'is_active' => ['sometimes', 'boolean'],
        ]);
    }
}

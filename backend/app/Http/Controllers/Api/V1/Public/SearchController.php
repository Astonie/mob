<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Contracts\SearchEngine;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request, SearchEngine $engine)
    {
        $request->validate(['q' => 'required|string|min:2|max:100', 'type' => 'nullable|string', 'page' => 'nullable|integer|min:1', 'per_page' => 'nullable|integer|min:1|max:50']);
        $types = $request->filled('type') ? explode(',', $request->string('type')) : [];
        $result = $engine->search($request->string('q'), $types, $request->integer('per_page', 15), $request->integer('page', 1));

        return response()->json(['data' => $result['data'], 'meta' => ['total' => $result['total'], 'query' => $request->string('q')]]);
    }
}

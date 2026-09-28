<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMineralRequest;
use App\Http\Resources\MineralResource;
use App\Models\Mineral;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MineralAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = Mineral::query()->withCount('projects')->latest();
        if ($request->filled('search')) {
            $q->where('name', 'like', '%'.$request->string('search').'%');
        }

        return MineralResource::collection($q->paginate($request->integer('per_page', 15)));
    }

    public function store(StoreMineralRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        $data['created_by'] = $request->user()->id;
        $mineral = Mineral::create($data);

        return new MineralResource($mineral);
    }

    public function show(Mineral $mineral)
    {
        $mineral->loadCount('projects');

        return new MineralResource($mineral);
    }

    public function update(Request $request, Mineral $mineral)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'], 'slug' => ['sometimes', 'string'], 'summary' => ['nullable', 'string'], 'description' => ['nullable', 'string'], 'category' => ['nullable', 'string'], 'is_featured' => ['nullable', 'boolean'], 'is_active' => ['nullable', 'boolean'],
        ]);
        $mineral->update($data);

        return new MineralResource($mineral);
    }

    public function destroy(Mineral $mineral)
    {
        $mineral->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

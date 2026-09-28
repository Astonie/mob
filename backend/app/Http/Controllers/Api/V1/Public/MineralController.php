<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\MineralResource;
use App\Models\Mineral;
use Illuminate\Http\Request;

class MineralController extends Controller
{
    public function index(Request $request)
    {
        $query = Mineral::query()->withCount('projects')->where('is_active', true)->where('status', 'published');
        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }
        $minerals = $query->orderBy('sort_order')->paginate($request->integer('per_page', 15));

        return MineralResource::collection($minerals);
    }

    public function show(string $slug)
    {
        $mineral = Mineral::with(['projects' => fn ($q) => $q->where('content_status', 'published')->with('location')])
            ->where('slug', $slug)->firstOrFail();

        return new MineralResource($mineral);
    }
}

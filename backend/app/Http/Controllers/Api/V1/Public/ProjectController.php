<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query()
            ->with(['location', 'minerals'])
            ->where('content_status', 'published')
            ->where('is_active', true);

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }
        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }
        if ($request->filled('mineral')) {
            $query->whereHas('minerals', fn ($q) => $q->where('slug', $request->string('mineral')));
        }
        if ($request->filled('country')) {
            $query->where('country', $request->string('country'));
        }
        if ($request->filled('search')) {
            $s = '%'.$request->string('search').'%';
            $query->where(fn ($q) => $q->where('name', 'like', $s)->orWhere('summary', 'like', $s));
        }

        $query->orderByRaw('is_featured DESC, sort_order ASC, published_at DESC');

        $projects = $query->paginate($request->integer('per_page', 12))->withQueryString();

        return ProjectResource::collection($projects);
    }

    public function show(string $slug)
    {
        $project = Project::with(['location', 'minerals', 'documents', 'media'])
            ->where('slug', $slug)
            ->where('content_status', 'published')
            ->firstOrFail();

        return new ProjectResource($project);
    }
}

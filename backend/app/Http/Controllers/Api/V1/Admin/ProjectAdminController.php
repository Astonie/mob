<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = Project::with(['location', 'minerals'])->latest();
        if ($request->filled('search')) {
            $s = '%'.$request->string('search').'%';
            $q->where(fn ($qq) => $qq->where('name', 'like', $s)->orWhere('slug', 'like', $s));
        }
        if ($request->filled('status')) {
            $q->where('content_status', $request->string('status'));
        }

        return ProjectResource::collection($q->paginate($request->integer('per_page', 15)));
    }

    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        $data['created_by'] = $request->user()->id;
        $minerals = $data['minerals'] ?? [];
        unset($data['minerals']);
        $project = Project::create($data);
        if (! empty($minerals)) {
            $project->minerals()->sync($minerals);
        }
        $project->load(['location', 'minerals']);

        return new ProjectResource($project);
    }

    public function show(Project $project)
    {
        $project->load(['location', 'minerals', 'documents', 'media']);

        return new ProjectResource($project);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        if (isset($data['name']) && empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $minerals = $data['minerals'] ?? null;
        unset($data['minerals']);
        $data['updated_by'] = $request->user()->id;
        $project->update($data);
        if (is_array($minerals)) {
            $project->minerals()->sync($minerals);
        }
        $project->load(['location', 'minerals']);

        return new ProjectResource($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function publish(Request $request, Project $project)
    {
        $project->update(['content_status' => 'published', 'status' => $project->status ?? 'operation', 'published_at' => now(), 'published_by' => $request->user()->id]);

        return new ProjectResource($project->fresh()->load(['location', 'minerals']));
    }
}

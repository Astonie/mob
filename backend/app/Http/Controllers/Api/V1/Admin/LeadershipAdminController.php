<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\LeadershipProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LeadershipAdminController extends Controller
{
    public function index(Request $request)
    {
        $q = LeadershipProfile::query()->orderBy('sort_order')->latest();
        if ($request->filled('search')) {
            $q->where('name', 'like', '%'.$request->string('search').'%');
        }
        if ($request->filled('category')) {
            $q->where('category', $request->string('category'));
        }

        return $q->paginate(min($request->integer('per_page', 15), 100));
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        $profile = LeadershipProfile::create($data);

        return response()->json(['data' => $profile], 201);
    }

    public function show(LeadershipProfile $leadershipProfile)
    {
        return response()->json(['data' => $leadershipProfile]);
    }

    public function update(Request $request, LeadershipProfile $leadershipProfile)
    {
        $data = $this->validated($request, forUpdate: true);
        unset($data['slug']);
        $leadershipProfile->update($data);

        return response()->json(['data' => $leadershipProfile]);
    }

    public function destroy(LeadershipProfile $leadershipProfile)
    {
        $leadershipProfile->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request, bool $forUpdate = false): array
    {
        $required = $forUpdate ? ['sometimes', 'required'] : ['required'];

        return $request->validate([
            'name' => [...$required, 'string', 'max:191'],
            'slug' => ['sometimes', 'string', 'max:191', 'unique:leadership_profiles,slug'],
            'position' => [...$required, 'string', 'max:191'],
            'category' => ['sometimes', 'in:board,executive,management'],
            'bio' => ['nullable', 'string'],
            'full_bio' => ['nullable', 'string'],
            'photo' => ['nullable', 'string', 'max:500'],
            'email' => ['nullable', 'email', 'max:191'],
            'linkedin_url' => ['nullable', 'string', 'max:500'],
            'sort_order' => ['sometimes', 'integer'],
            'is_active' => ['sometimes', 'boolean'],
        ]);
    }
}

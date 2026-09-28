<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LocationAdminController extends Controller
{
    public function index(Request $request)
    {
        return Location::query()->orderBy('sort_order')->paginate($request->integer('per_page', 15));
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => 'required|string', 'slug' => 'nullable|string|unique:locations,slug', 'type' => 'nullable|string', 'country' => 'nullable|string', 'city' => 'nullable|string', 'latitude' => 'nullable|numeric', 'longitude' => 'nullable|numeric']);
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        return Location::create($data);
    }

    public function show(Location $location)
    {
        return $location;
    }

    public function update(Request $request, Location $location)
    {
        $location->update($request->validate(['name' => 'sometimes|string', 'slug' => 'sometimes|string', 'type' => 'nullable|string', 'country' => 'nullable|string']));

        return $location;
    }

    public function destroy(Location $location)
    {
        $location->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

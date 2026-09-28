<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\NavigationMenu;
use Illuminate\Http\Request;

class NavigationAdminController extends Controller
{
    public function index()
    {
        return NavigationMenu::with('items')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => 'required|string', 'slug' => 'required|string|unique:navigation_menus,slug', 'location' => 'nullable|string']);

        return NavigationMenu::create($data);
    }

    public function show(NavigationMenu $navigationMenu)
    {
        $navigationMenu->load('allItems');

        return $navigationMenu;
    }

    public function update(Request $request, NavigationMenu $navigationMenu)
    {
        $navigationMenu->update($request->validate(['name' => 'sometimes|string', 'slug' => 'sometimes|string', 'location' => 'nullable|string']));

        return $navigationMenu;
    }

    public function destroy(NavigationMenu $navigationMenu)
    {
        $navigationMenu->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

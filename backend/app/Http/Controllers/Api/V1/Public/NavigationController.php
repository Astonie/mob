<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\NavigationMenuResource;
use App\Models\NavigationMenu;
use Illuminate\Http\Request;

class NavigationController extends Controller
{
    public function show(Request $request)
    {
        $slug = $request->query('menu', 'main');
        $menu = NavigationMenu::with(['items' => function ($q) {
            $q->whereNull('parent_id')->with('children')->orderBy('sort_order');
        }])
            ->where('slug', $slug)->where('is_active', true)->firstOrFail();

        return new NavigationMenuResource($menu);
    }
}

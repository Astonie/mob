<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\NavigationItem;
use App\Models\NavigationMenu;
use Illuminate\Http\Request;

class NavigationItemAdminController extends Controller
{
    public function store(Request $request, NavigationMenu $navigationMenu)
    {
        $data = $this->validated($request);
        $data['navigation_menu_id'] = $navigationMenu->id;
        if (! empty($data['parent_id'])) {
            $this->assertSameMenu($navigationMenu, $data['parent_id']);
        }
        $item = NavigationItem::create($data);

        return response()->json(['data' => $item], 201);
    }

    public function update(Request $request, NavigationItem $navigationItem)
    {
        $data = $this->validated($request, updating: true);
        if (! empty($data['parent_id'])) {
            $this->assertSameMenu($navigationItem->menu, $data['parent_id'], $navigationItem->id);
        }
        $navigationItem->update($data);

        return response()->json(['data' => $navigationItem]);
    }

    public function destroy(NavigationItem $navigationItem)
    {
        $navigationItem->children()->delete();
        $navigationItem->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request, bool $updating = false): array
    {
        return $request->validate([
            'title' => [($updating ? 'sometimes' : 'required'), 'string', 'max:191'],
            'url' => ['nullable', 'string', 'max:500'],
            'type' => ['sometimes', 'in:internal,external,page,project,mineral'],
            'target' => ['sometimes', 'in:_self,_blank'],
            'parent_id' => ['nullable', 'string'],
            'page_id' => ['nullable', 'string', 'exists:pages,id'],
            'sort_order' => ['sometimes', 'integer'],
            'is_active' => ['sometimes', 'boolean'],
        ]);
    }

    private function assertSameMenu(NavigationMenu $menu, string $parentId, ?string $ignoreId = null): void
    {
        $parent = NavigationItem::find($parentId);
        abort_if(
            ! $parent || $parent->navigation_menu_id !== $menu->id || $parent->id === $ignoreId,
            422,
            'parent_id must reference an item in the same menu'
        );
    }
}

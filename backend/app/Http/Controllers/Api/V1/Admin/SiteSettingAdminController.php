<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SiteSettingAdminController extends Controller
{
    public function index()
    {
        return response()->json(['data' => SiteSetting::orderBy('group')->orderBy('key')->get()]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request, forStore: true);
        $setting = SiteSetting::updateOrCreate(['key' => $data['key']], $data);
        $this->forgetCache($setting->key);

        return response()->json(['data' => $setting], 201);
    }

    public function update(Request $request, string $key)
    {
        $data = $this->validated($request, forStore: false);
        $setting = SiteSetting::updateOrCreate(['key' => $key], $data);
        $this->forgetCache($setting->key);

        return response()->json(['data' => $setting]);
    }

    public function destroy(string $key)
    {
        $setting = SiteSetting::where('key', $key)->firstOrFail();
        $setting->delete();
        $this->forgetCache($key);

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request, bool $forStore): array
    {
        return $request->validate([
            'key' => [$forStore ? 'required' : 'prohibited', 'string', 'max:191', 'regex:/^[a-z0-9_.\-]+$/i'],
            'value' => ['nullable'],
            'type' => ['sometimes', 'in:text,json,boolean,number,image'],
            'group' => ['sometimes', 'in:general,seo,contact,social,appearance,content'],
            'description' => ['nullable', 'string'],
            'is_public' => ['sometimes', 'boolean'],
        ]);
    }

    private function forgetCache(string $key): void
    {
        Cache::forget("site_setting:$key");
        Cache::forget('site_settings:all');
    }
}

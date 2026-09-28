<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SiteSetting extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = ['key', 'value', 'type', 'group', 'description', 'is_public'];

    protected function casts(): array
    {
        return [
            'value' => 'array',
            'is_public' => 'boolean',
        ];
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        return Cache::rememberForever("site_setting:$key", fn () => self::where('key', $key)->first()?->value ?? $default);
    }

    public static function set(string $key, mixed $value): void
    {
        $setting = self::updateOrCreate(['key' => $key], ['value' => $value]);
        Cache::forget("site_setting:$key");
    }

    public static function cachedAll(): array
    {
        return Cache::rememberForever('site_settings:all', fn () => self::all()->pluck('value', 'key')->toArray());
    }

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('site_settings:all'));
        static::deleted(fn () => Cache::forget('site_settings:all'));
    }
}

<?php

namespace App\Support;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class Revalidate
{
    public static bool $force = false;

    public static function tag(string $tag): void
    {
        self::send(['tag' => $tag]);
    }

    public static function tags(string ...$tags): void
    {
        foreach ($tags as $tag) {
            self::tag($tag);
        }
    }

    public static function path(string $path): void
    {
        self::send(['path' => $path]);
    }

    private static function send(array $payload): void
    {
        $secret = config('app.revalidate_secret');
        $frontend = rtrim(config('app.revalidate_url') ?: 'http://localhost:3000', '/');

        if (! $secret || (app()->runningInConsole() && ! self::$force)) {
            return;
        }

        try {
            Http::timeout(3)->post($frontend.'/api/revalidate?secret='.urlencode($secret), $payload);
        } catch (\Throwable $e) {
            Log::warning('ISR revalidation failed: '.$e->getMessage());
        }
    }
}

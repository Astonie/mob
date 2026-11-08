<?php

namespace App\Http\Middleware;

use App\Models\VisitorLog;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class TrackVisitor
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only track GET requests for HTML pages, skip admin/API/assets
        if ($request->isMethod('GET') && ! $request->is('admin/*', 'api/*', 'storage/*', '*.css', '*.js', '*.png', '*.jpg', '*.svg', '*.ico')) {
            try {
                $ip = $request->ip();
                [$country, $city] = $this->locate($ip);
                VisitorLog::create([
                    'ip_address' => $ip,
                    'path' => substr($request->path(), 0, 500),
                    'user_agent' => substr($request->userAgent() ?? '', 0, 500),
                    'country' => $country,
                    'city' => $city,
                    'referer' => substr($request->headers->get('referer') ?? '', 0, 500),
                ]);
            } catch (\Throwable $e) {
                // never break the request
            }
        }

        return $response;
    }

    protected function locate(string $ip): array
    {
        if (in_array($ip, ['127.0.0.1', '::1']) || filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
            return [null, null];
        }

        return Cache::remember("geo:{$ip}", 86400, function () use ($ip) {
            try {
                $ctx = stream_context_create(['http' => ['timeout' => 1, 'ignore_errors' => true]]);
                $raw = @file_get_contents("http://ip-api.com/json/{$ip}?fields=country,city", false, $ctx);
                if ($raw) {
                    $data = json_decode($raw, true);

                    return [$data['country'] ?? null, $data['city'] ?? null];
                }
            } catch (\Throwable $e) {
            }

            return [null, null];
        });
    }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceBasePath
{
    public function handle(Request $request, Closure $next): Response
    {
        // Allow the app to run from a subfolder (e.g. /api) while keeping
        // route URIs absolute to the domain root.
        $request->server->set('SCRIPT_NAME', '/index.php');
        $request->server->set('PHP_SELF', '/index.php');

        return $next($request);
    }
}

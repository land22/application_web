<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            return route('login');
        }
    }

    public function handle($request, Closure $next, ...$guards)
    {
        if (empty($guards)) {
            $guards = ['api'];
        }

        foreach ($guards as $guard) {
            if (auth()->guard($guard)->guest()) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }
        }
        if (auth()->guard('api')->guest()) {
            \Log::info('Token non reconnu ou utilisateur non authentifié.');
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        return $next($request);
    }

}

<?php

namespace App\Http\Middleware;

use App\Http\Controllers\GlobalFunctions;
use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HasAdmin
{
    /**
     * Handle an incoming request.
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     * @throws AuthenticationException
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        if (!GlobalFunctions::checkUserHasLicence(Auth::user()->licenses)) {
            throw new AuthenticationException(
                'no licence.', $guards, $this->redirectTo()
            );
        }
        return $next($request);
    }

    private function redirectTo()
    {
        return route(RouteServiceProvider::HOME_NAME);
    }
}

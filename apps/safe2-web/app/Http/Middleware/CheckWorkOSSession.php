<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\WorkOS\WorkOS;
use Symfony\Component\HttpFoundation\Response;

class CheckWorkOSSession
{
    /**
     * Handle an incoming request.
     *
     * This middleware validates the WorkOS session on every page load.
     * If the session is valid, the user remains authenticated.
     * If the session is invalid or expired, the user is logged out.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only check session if user is currently authenticated in Laravel
        if (Auth::check()) {
            try {
                // Get the current session from the request
                $accessToken = $request->session()->get('workos_access_token');
                $refreshToken = $request->session()->get('workos_refresh_token');

                if ($accessToken && $refreshToken) {
                    try {
                        // Validate and potentially refresh the access token
                        [$newAccessToken, $newRefreshToken] = WorkOS::ensureAccessTokenIsValid(
                            $accessToken,
                            $refreshToken
                        );

                        // Update session if tokens were refreshed
                        if ($newAccessToken !== $accessToken || $newRefreshToken !== $refreshToken) {
                            $request->session()->put('workos_access_token', $newAccessToken);
                            $request->session()->put('workos_refresh_token', $newRefreshToken);

                            Log::info('WorkOS session refreshed successfully', [
                                'user_id' => Auth::id(),
                            ]);
                        }
                    } catch (\Exception $e) {
                        // Token validation/refresh failed - session is no longer valid
                        Log::info('WorkOS session validation failed, logging out user', [
                            'error' => $e->getMessage(),
                            'user_id' => Auth::id(),
                        ]);

                        $this->logoutUser($request);
                    }
                } else {
                    // No WorkOS tokens found but user is authenticated - logout
                    Log::warning('No WorkOS tokens found for authenticated user, logging out', [
                        'user_id' => Auth::id(),
                    ]);

                    $this->logoutUser($request);
                }
            } catch (\Exception $e) {
                // Any error during validation - logout for safety
                Log::error('WorkOS session validation error, logging out user', [
                    'error' => $e->getMessage(),
                    'user_id' => Auth::id(),
                ]);

                $this->logoutUser($request);
            }
        }

        return $next($request);
    }

    /**
     * Logout the user and clear session
     *
     * @param Request $request
     * @return void
     */
    private function logoutUser(Request $request): void
    {
        Auth::logout();
        $request->session()->forget('workos_access_token');
        $request->session()->forget('workos_refresh_token');
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}

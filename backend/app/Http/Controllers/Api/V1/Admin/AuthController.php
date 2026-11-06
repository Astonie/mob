<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Support\Totp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRule;

class AuthController extends Controller
{
    private const MAX_ATTEMPTS = 5;

    private const LOCK_MINUTES = 15;

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $request->string('email'))->first();

        if ($user && $user->locked_until && $user->locked_until->isFuture()) {
            $minutes = (int) ceil(now()->diffInSeconds($user->locked_until) / 60);

            return response()->json([
                'message' => "Account locked. Try again in {$minutes} minute(s).",
            ], 423);
        }

        if (! $user || ! Hash::check($request->string('password'), $user->password)) {
            if ($user) {
                $user->increment('failed_login_attempts');
                if ($user->failed_login_attempts >= self::MAX_ATTEMPTS) {
                    $user->update(['locked_until' => now()->addMinutes(self::LOCK_MINUTES)]);
                }
            }

            return response()->json(['message' => 'Invalid credentials'], 422);
        }

        // success: reset lockout state
        $user->update([
            'failed_login_attempts' => 0,
            'locked_until' => null,
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
        ]);

        if ($user->two_factor_enabled) {
            $nonce = Str::random(40);
            Cache::put('2fa_challenge:'.$nonce, $user->id, now()->addMinutes(5));

            return response()->json([
                'message' => 'Two-factor authentication required',
                'data' => [
                    'requires_two_factor' => true,
                    'two_factor_token' => $nonce,
                ],
            ]);
        }

        $plain = $user->createToken('cms', ['*'])->plainTextToken;

        return response()->json([
            'message' => 'Authenticated',
            'data' => [
                'user' => $this->userPayload($user),
                'token' => $plain,
            ],
        ]);
    }

    public function verifyTwoFactor(Request $request)
    {
        $request->validate([
            'two_factor_token' => ['required', 'string'],
            'code' => ['required', 'string'],
        ]);

        $nonce = $request->string('two_factor_token');
        $userId = Cache::get('2fa_challenge:'.$nonce);
        if (! $userId) {
            return response()->json(['message' => 'Invalid or expired challenge (cache miss)'], 422);
        }
        Cache::forget('2fa_challenge:'.$nonce);

        $user = User::find($userId);
        if (! $user || ! $user->two_factor_enabled || ! $user->two_factor_secret) {
            return response()->json(['message' => 'Invalid challenge'], 422);
        }

        if (! Totp::verify($user->two_factor_secret, $request->string('code'))) {
            return response()->json(['message' => 'Invalid authentication code'], 422);
        }

        $plain = $user->createToken('cms', ['*'])->plainTextToken;

        return response()->json([
            'message' => 'Authenticated',
            'data' => [
                'user' => $this->userPayload($user),
                'token' => $plain,
            ],
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $user->load('roles', 'permissions');

        return response()->json([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'two_factor_enabled' => (bool) $user->two_factor_enabled,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => ['required', 'email']]);

        Password::sendResetLink($request->only('email'));

        return response()->json([
            'message' => 'If an account exists for that email, a password reset link has been sent.',
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'confirmed', PasswordRule::min(12)->mixedCase()->numbers()->symbols()],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'password_changed_at' => now(),
                    'failed_login_attempts' => 0,
                    'locked_until' => null,
                ])->save();
                $user->tokens()->delete();
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Invalid or expired token'], 422);
        }

        return response()->json(['message' => 'Password reset successful']);
    }

    // 2FA management (authenticated)
    public function twoFactorSetup(Request $request)
    {
        $user = $request->user();
        $secret = Totp::generateSecret();
        $user->update(['two_factor_secret' => $secret, 'two_factor_enabled' => false, 'two_factor_confirmed_at' => null]);

        return response()->json([
            'data' => [
                'secret' => $secret,
                'otpauth_url' => Totp::otpAuthUrl($secret, $user->email),
            ],
        ]);
    }

    public function twoFactorConfirm(Request $request)
    {
        $request->validate(['code' => ['required', 'string']]);

        $user = $request->user();
        if (! $user->two_factor_secret) {
            return response()->json(['message' => 'Run setup first'], 422);
        }
        if (! Totp::verify($user->two_factor_secret, $request->string('code'))) {
            return response()->json(['message' => 'Invalid code'], 422);
        }
        $user->update(['two_factor_enabled' => true, 'two_factor_confirmed_at' => now()]);

        return response()->json(['message' => 'Two-factor authentication enabled']);
    }

    public function twoFactorDisable(Request $request)
    {
        $request->validate([
            'password' => ['required', 'string'],
            'code' => ['nullable', 'string'],
        ]);

        $user = $request->user();
        if (! Hash::check($request->string('password'), $user->password)) {
            return response()->json(['message' => 'Invalid password'], 422);
        }
        if ($user->two_factor_enabled) {
            if (! $request->filled('code') || ! Totp::verify($user->two_factor_secret, $request->string('code'))) {
                return response()->json(['message' => 'Invalid authentication code'], 422);
            }
        }
        $user->update(['two_factor_secret' => null, 'two_factor_enabled' => false, 'two_factor_confirmed_at' => null]);

        return response()->json(['message' => 'Two-factor authentication disabled']);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'confirmed', PasswordRule::min(12)->mixedCase()->numbers()->symbols()],
        ]);

        $user = $request->user();
        if (! Hash::check($request->string('current_password'), $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }
        $user->update([
            'password' => Hash::make($request->string('password')),
            'password_changed_at' => now(),
            'failed_login_attempts' => 0,
            'locked_until' => null,
        ]);
        // revoke all other tokens
        $current = $request->user()->currentAccessToken()->id;
        $user->tokens()->where('id', '!=', $current)->delete();

        return response()->json(['message' => 'Password changed']);
    }

    // Session management
    public function sessions(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'data' => $user->tokens()->latest()->get()->map(fn ($t) => [
                'id' => $t->id,
                'name' => $t->name,
                'last_used_at' => $t->last_used_at,
                'created_at' => $t->created_at,
                'ip_address' => null,
                'is_current' => $t->id === $request->user()->currentAccessToken()->id,
            ]),
        ]);
    }

    public function revokeSession(Request $request, string $id)
    {
        $user = $request->user();
        $token = $user->tokens()->where('id', $id)->first();
        if (! $token) {
            return response()->json(['message' => 'Not found'], 404);
        }
        if ($token->id === $request->user()->currentAccessToken()->id) {
            return response()->json(['message' => 'Cannot revoke current session'], 422);
        }
        $token->delete();

        return response()->json(['message' => 'Session revoked']);
    }

    public function revokeAllSessions(Request $request)
    {
        $user = $request->user();
        $current = $request->user()->currentAccessToken()->id;
        $user->tokens()->where('id', '!=', $current)->delete();

        return response()->json(['message' => 'All other sessions revoked']);
    }

    private function userPayload(User $user): array
    {
        $user->load('roles', 'permissions');

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames(),
            'permissions' => $user->getAllPermissions()->pluck('name'),
            'two_factor_enabled' => (bool) $user->two_factor_enabled,
        ];
    }
}

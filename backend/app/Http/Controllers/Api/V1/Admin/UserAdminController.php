<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password as PasswordRule;
use Spatie\Permission\Models\Role;

class UserAdminController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => User::with('roles')->latest()->get()->map(fn ($u) => $this->payload($u)),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:191'],
            'email' => ['required', 'email', 'max:191', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed', PasswordRule::min(12)->mixedCase()->numbers()->symbols()],
            'roles' => ['sometimes', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'password_changed_at' => now(),
        ]);
        if (! empty($data['roles'])) {
            $user->syncRoles($data['roles']);
        }

        return response()->json(['data' => $this->payload($user->load('roles'))], 201);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:191'],
            'email' => ['sometimes', 'email', 'max:191', 'unique:users,email,'.$user->id],
            'password' => ['nullable', 'string', 'confirmed', PasswordRule::min(12)->mixedCase()->numbers()->symbols()],
            'roles' => ['sometimes', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
            'locked' => ['sometimes', 'boolean'],
        ]);

        if (isset($data['name'])) {
            $user->name = $data['name'];
        }
        if (isset($data['email'])) {
            $user->email = $data['email'];
        }
        if (! empty($data['password'])) {
            $user->password = Hash::make($data['password']);
            $user->password_changed_at = now();
            $user->tokens()->delete();
        }
        if (isset($data['locked'])) {
            if ($data['locked']) {
                $user->locked_until = now()->addYears(1);
            } else {
                $user->locked_until = null;
                $user->failed_login_attempts = 0;
            }
        }
        $user->save();
        if (isset($data['roles'])) {
            $user->syncRoles($data['roles']);
        }

        return response()->json(['data' => $this->payload($user->load('roles'))]);
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'Cannot delete your own account'], 422);
        }
        $user->tokens()->delete();
        $user->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function roles()
    {
        return response()->json(['data' => Role::with('permissions')->get()]);
    }

    private function payload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames(),
            'permissions' => $user->getAllPermissions()->pluck('name'),
            'two_factor_enabled' => (bool) $user->two_factor_enabled,
            'locked' => $user->locked_until && $user->locked_until->isFuture(),
            'last_login_at' => $user->last_login_at,
            'created_at' => $user->created_at,
        ];
    }
}

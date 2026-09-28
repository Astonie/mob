<?php

namespace App\Policies;

use App\Models\User;

class MineralPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(strtolower('Mineral').'.view') || $user->hasRole('super-admin');
    }

    public function view(User $user, $model): bool
    {
        return $user->can(strtolower('Mineral').'.view') || $user->hasRole('super-admin');
    }

    public function create(User $user): bool
    {
        return $user->can(strtolower('Mineral').'.create') || $user->hasRole('super-admin');
    }

    public function update(User $user, $model): bool
    {
        return $user->can(strtolower('Mineral').'.update') || $user->hasRole('super-admin');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can(strtolower('Mineral').'.delete') || $user->hasRole('super-admin');
    }
}

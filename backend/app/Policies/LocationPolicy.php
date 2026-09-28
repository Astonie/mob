<?php

namespace App\Policies;

use App\Models\User;

class LocationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(strtolower('Location').'.view') || $user->hasRole('super-admin');
    }

    public function view(User $user, $model): bool
    {
        return $user->can(strtolower('Location').'.view') || $user->hasRole('super-admin');
    }

    public function create(User $user): bool
    {
        return $user->can(strtolower('Location').'.create') || $user->hasRole('super-admin');
    }

    public function update(User $user, $model): bool
    {
        return $user->can(strtolower('Location').'.update') || $user->hasRole('super-admin');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can(strtolower('Location').'.delete') || $user->hasRole('super-admin');
    }
}

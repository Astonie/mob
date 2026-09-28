<?php

namespace App\Policies;

use App\Models\User;

class CareerPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(strtolower('Career').'.view') || $user->hasRole('super-admin');
    }

    public function view(User $user, $model): bool
    {
        return $user->can(strtolower('Career').'.view') || $user->hasRole('super-admin');
    }

    public function create(User $user): bool
    {
        return $user->can(strtolower('Career').'.create') || $user->hasRole('super-admin');
    }

    public function update(User $user, $model): bool
    {
        return $user->can(strtolower('Career').'.update') || $user->hasRole('super-admin');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can(strtolower('Career').'.delete') || $user->hasRole('super-admin');
    }
}

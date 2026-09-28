<?php

namespace App\Policies;

use App\Models\User;

class CategoryPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(strtolower('Category').'.view') || $user->hasRole('super-admin');
    }

    public function view(User $user, $model): bool
    {
        return $user->can(strtolower('Category').'.view') || $user->hasRole('super-admin');
    }

    public function create(User $user): bool
    {
        return $user->can(strtolower('Category').'.create') || $user->hasRole('super-admin');
    }

    public function update(User $user, $model): bool
    {
        return $user->can(strtolower('Category').'.update') || $user->hasRole('super-admin');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can(strtolower('Category').'.delete') || $user->hasRole('super-admin');
    }
}

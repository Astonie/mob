<?php

namespace App\Policies;

use App\Models\User;

class PagePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(strtolower('Page').'.view') || $user->hasRole('super-admin');
    }

    public function view(User $user, $model): bool
    {
        return $user->can(strtolower('Page').'.view') || $user->hasRole('super-admin');
    }

    public function create(User $user): bool
    {
        return $user->can(strtolower('Page').'.create') || $user->hasRole('super-admin');
    }

    public function update(User $user, $model): bool
    {
        return $user->can(strtolower('Page').'.update') || $user->hasRole('super-admin');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can(strtolower('Page').'.delete') || $user->hasRole('super-admin');
    }
}

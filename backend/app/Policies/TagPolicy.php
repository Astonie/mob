<?php

namespace App\Policies;

use App\Models\User;

class TagPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(strtolower('Tag').'.view') || $user->hasRole('super-admin');
    }

    public function view(User $user, $model): bool
    {
        return $user->can(strtolower('Tag').'.view') || $user->hasRole('super-admin');
    }

    public function create(User $user): bool
    {
        return $user->can(strtolower('Tag').'.create') || $user->hasRole('super-admin');
    }

    public function update(User $user, $model): bool
    {
        return $user->can(strtolower('Tag').'.update') || $user->hasRole('super-admin');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can(strtolower('Tag').'.delete') || $user->hasRole('super-admin');
    }
}

<?php

namespace App\Policies;

use App\Models\User;

class LeadershipProfilePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(strtolower('LeadershipProfile').'.view') || $user->hasRole('super-admin');
    }

    public function view(User $user, $model): bool
    {
        return $user->can(strtolower('LeadershipProfile').'.view') || $user->hasRole('super-admin');
    }

    public function create(User $user): bool
    {
        return $user->can(strtolower('LeadershipProfile').'.create') || $user->hasRole('super-admin');
    }

    public function update(User $user, $model): bool
    {
        return $user->can(strtolower('LeadershipProfile').'.update') || $user->hasRole('super-admin');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can(strtolower('LeadershipProfile').'.delete') || $user->hasRole('super-admin');
    }
}

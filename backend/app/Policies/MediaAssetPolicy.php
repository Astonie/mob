<?php

namespace App\Policies;

use App\Models\User;

class MediaAssetPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(strtolower('MediaAsset').'.view') || $user->hasRole('super-admin');
    }

    public function view(User $user, $model): bool
    {
        return $user->can(strtolower('MediaAsset').'.view') || $user->hasRole('super-admin');
    }

    public function create(User $user): bool
    {
        return $user->can(strtolower('MediaAsset').'.create') || $user->hasRole('super-admin');
    }

    public function update(User $user, $model): bool
    {
        return $user->can(strtolower('MediaAsset').'.update') || $user->hasRole('super-admin');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can(strtolower('MediaAsset').'.delete') || $user->hasRole('super-admin');
    }
}

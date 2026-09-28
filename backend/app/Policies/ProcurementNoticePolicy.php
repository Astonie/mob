<?php

namespace App\Policies;

use App\Models\User;

class ProcurementNoticePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(strtolower('ProcurementNotice').'.view') || $user->hasRole('super-admin');
    }

    public function view(User $user, $model): bool
    {
        return $user->can(strtolower('ProcurementNotice').'.view') || $user->hasRole('super-admin');
    }

    public function create(User $user): bool
    {
        return $user->can(strtolower('ProcurementNotice').'.create') || $user->hasRole('super-admin');
    }

    public function update(User $user, $model): bool
    {
        return $user->can(strtolower('ProcurementNotice').'.update') || $user->hasRole('super-admin');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can(strtolower('ProcurementNotice').'.delete') || $user->hasRole('super-admin');
    }
}

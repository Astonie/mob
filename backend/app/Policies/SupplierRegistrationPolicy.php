<?php

namespace App\Policies;

use App\Models\User;

class SupplierRegistrationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(strtolower('SupplierRegistration').'.view') || $user->hasRole('super-admin');
    }

    public function view(User $user, $model): bool
    {
        return $user->can(strtolower('SupplierRegistration').'.view') || $user->hasRole('super-admin');
    }

    public function create(User $user): bool
    {
        return $user->can(strtolower('SupplierRegistration').'.create') || $user->hasRole('super-admin');
    }

    public function update(User $user, $model): bool
    {
        return $user->can(strtolower('SupplierRegistration').'.update') || $user->hasRole('super-admin');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can(strtolower('SupplierRegistration').'.delete') || $user->hasRole('super-admin');
    }
}

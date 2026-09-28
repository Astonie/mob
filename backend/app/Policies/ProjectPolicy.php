<?php

namespace App\Policies;

use App\Models\User;

class ProjectPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('projects.view');
    }

    public function view(User $user, $model): bool
    {
        return $user->can('projects.view');
    }

    public function create(User $user): bool
    {
        return $user->can('projects.create');
    }

    public function update(User $user, $model): bool
    {
        return $user->can('projects.update');
    }

    public function delete(User $user, $model): bool
    {
        return $user->can('projects.delete');
    }

    public function publish(User $user, $model): bool
    {
        return $user->can('projects.publish');
    }
}

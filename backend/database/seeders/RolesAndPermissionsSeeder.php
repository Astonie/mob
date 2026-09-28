<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'pages.view', 'pages.create', 'pages.update', 'pages.delete', 'pages.publish',
            'projects.view', 'projects.create', 'projects.update', 'projects.delete', 'projects.publish',
            'minerals.view', 'minerals.create', 'minerals.update', 'minerals.delete',
            'news.view', 'news.create', 'news.update', 'news.delete', 'news.publish',
            'leadership.view', 'leadership.create', 'leadership.update', 'leadership.delete',
            'careers.view', 'careers.create', 'careers.update', 'careers.delete',
            'career_applications.view',
            'procurement.view', 'procurement.create', 'procurement.update', 'procurement.delete',
            'media.view', 'media.create', 'media.update', 'media.delete',
            'documents.view', 'documents.create', 'documents.update', 'documents.delete',
            'navigation.manage', 'seo.manage', 'settings.manage', 'users.manage', 'audit.view',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        $roles = [
            'super-admin' => $permissions,
            'content-admin' => array_filter($permissions, fn ($p) => ! in_array($p, ['users.manage'])),
            'editor' => ['pages.view', 'pages.create', 'pages.update', 'projects.view', 'projects.create', 'projects.update', 'minerals.view', 'news.view', 'news.create', 'news.update', 'media.view', 'media.create'],
            'publisher' => ['pages.view', 'pages.create', 'pages.update', 'pages.publish', 'projects.view', 'projects.create', 'projects.update', 'projects.publish', 'news.view', 'news.create', 'news.update', 'news.publish', 'media.view'],
            'media-manager' => ['media.view', 'media.create', 'media.update', 'media.delete', 'documents.view', 'documents.create', 'documents.update', 'documents.delete'],
            'hr-manager' => ['careers.view', 'careers.create', 'careers.update', 'careers.delete', 'career_applications.view'],
            'procurement-manager' => ['procurement.view', 'procurement.create', 'procurement.update', 'procurement.delete'],
            'comms-manager' => ['news.view', 'news.create', 'news.update', 'news.publish', 'pages.view'],
            'viewer' => ['pages.view', 'projects.view', 'minerals.view', 'news.view', 'media.view'],
        ];

        foreach ($roles as $roleName => $perms) {
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
            $role->syncPermissions($perms);
        }
    }
}

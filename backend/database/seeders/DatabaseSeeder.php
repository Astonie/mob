<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesAndPermissionsSeeder::class);

        if (app()->environment('production')) {
            $this->provisionProductionAdmin();
            $this->call(SiteSettingsSeeder::class);
            $this->call(PagesSeeder::class);

            return;
        }

        $this->seedDemoUsers();
        $this->call(DemoDataSeeder::class);
        $this->call(SiteSettingsSeeder::class);
    }

    /**
     * Create the first super-admin in production from env credentials.
     * No user is created unless SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are set.
     */
    private function provisionProductionAdmin(): void
    {
        $email = config('app.seed_admin.email');
        $password = config('app.seed_admin.password');

        if (! $email || ! $password) {
            return;
        }

        $admin = User::firstOrCreate(['email' => $email], [
            'name' => config('app.seed_admin.name'),
            'password' => Hash::make($password),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('super-admin');
    }

    /**
     * Demo accounts for local/staging use only. Never seeded in production.
     */
    private function seedDemoUsers(): void
    {
        User::firstOrCreate(['email' => 'admin@mining.example'], [
            'name' => 'Super Admin',
            'password' => Hash::make('Admin123!'),
            'email_verified_at' => now(),
        ])->assignRole('super-admin');

        User::firstOrCreate(['email' => 'editor@mining.example'], [
            'name' => 'Editor User',
            'password' => Hash::make('Editor123!'),
            'email_verified_at' => now(),
        ])->assignRole('editor');

        User::firstOrCreate(['email' => 'test@example.com'], [
            'name' => 'Test User',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ])->assignRole('viewer');
    }
}

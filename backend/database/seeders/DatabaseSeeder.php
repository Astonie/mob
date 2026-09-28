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

        $superAdmin = User::firstOrCreate(['email' => 'admin@mining.example'], [
            'name' => 'Super Admin',
            'password' => Hash::make('Admin123!'),
            'email_verified_at' => now(),
        ]);
        $superAdmin->assignRole('super-admin');

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

        $this->call(DemoDataSeeder::class);
    }
}

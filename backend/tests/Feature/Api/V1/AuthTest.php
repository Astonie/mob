<?php

use App\Models\User;
use Database\Seeders\RolesAndPermissionsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(RolesAndPermissionsSeeder::class);
});

it('can login and get token', function () {
    $user = User::factory()->create(['email' => 'auth@test.com', 'password' => bcrypt('password')]);
    $user->assignRole('super-admin');

    $response = $this->postJson('/api/v1/auth/login', ['email' => 'auth@test.com', 'password' => 'password']);
    $response->assertOk()->assertJsonStructure(['data' => ['token', 'user']]);
});

it('rejects invalid credentials', function () {
    $response = $this->postJson('/api/v1/auth/login', ['email' => 'no@no.com', 'password' => 'wrong']);
    $response->assertStatus(422);
});

it('requires auth for admin dashboard', function () {
    $response = $this->getJson('/api/v1/admin/dashboard');
    $response->assertUnauthorized();
});

it('allows authenticated admin to view dashboard', function () {
    $user = User::factory()->create();
    $user->assignRole('super-admin');
    $token = $user->createToken('test')->plainTextToken;

    $response = $this->withHeader('Authorization', "Bearer $token")->getJson('/api/v1/admin/dashboard');
    $response->assertOk()->assertJsonStructure(['data' => ['stats']]);
});

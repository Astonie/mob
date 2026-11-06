<?php

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

it('admin can create project', function () {
    $admin = User::where('email', 'admin@mining.example')->first();
    $token = $admin->createToken('test')->plainTextToken;

    $response = $this->withHeader('Authorization', "Bearer $token")->postJson('/api/v1/admin/projects', [
        'name' => 'Test Project For Admin',
        'summary' => 'Summary',
        'status' => 'exploration',
    ]);

    $response->assertCreated()->assertJsonPath('data.name', 'Test Project For Admin');
});

it('admin can publish project', function () {
    $admin = User::where('email', 'admin@mining.example')->first();
    $token = $admin->createToken('test')->plainTextToken;

    $project = Project::where('content_status', 'published')->first();

    $response = $this->withHeader('Authorization', "Bearer $token")->postJson("/api/v1/admin/projects/{$project->slug}/publish");
    $response->assertOk();
});

it('viewer cannot create project', function () {
    $viewer = User::where('email', 'test@example.com')->first();
    $token = $viewer->createToken('test')->plainTextToken;

    $response = $this->withHeader('Authorization', "Bearer $token")->postJson('/api/v1/admin/projects', [
        'name' => 'Should Fail',
        'summary' => 'Summary',
        'status' => 'exploration',
    ]);

    $response->assertForbidden();
    expect(Project::where('name', 'Should Fail')->exists())->toBeFalse();
});

it('editor cannot delete or publish a project', function () {
    $editor = User::where('email', 'editor@mining.example')->first();
    $token = $editor->createToken('test')->plainTextToken;
    $project = Project::first();

    $this->withHeader('Authorization', "Bearer $token")
        ->deleteJson("/api/v1/admin/projects/{$project->slug}")
        ->assertForbidden();

    $this->withHeader('Authorization', "Bearer $token")
        ->postJson("/api/v1/admin/projects/{$project->slug}/publish")
        ->assertForbidden();
});

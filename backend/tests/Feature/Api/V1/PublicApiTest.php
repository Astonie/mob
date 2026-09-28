<?php

use App\Models\ContactSubmission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed();
});

it('lists published projects', function () {
    $response = $this->getJson('/api/v1/projects');
    $response->assertOk()->assertJsonStructure(['data', 'meta', 'links']);
    expect($response->json('data'))->toHaveCount(4);
});

it('shows a project by slug', function () {
    $response = $this->getJson('/api/v1/projects/kansanshi-copper-gold-mine');
    $response->assertOk()->assertJsonPath('data.slug', 'kansanshi-copper-gold-mine');
});

it('lists minerals', function () {
    $response = $this->getJson('/api/v1/minerals');
    $response->assertOk();
    expect($response->json('data.data') ?? $response->json('data'))->not->toBeEmpty();
});

it('lists news', function () {
    $response = $this->getJson('/api/v1/news');
    $response->assertOk()->assertJsonStructure(['data']);
});

it('returns 404 for unknown project', function () {
    $response = $this->getJson('/api/v1/projects/unknown-slug-xyz');
    $response->assertNotFound();
});

it('can create contact submission', function () {
    $response = $this->postJson('/api/v1/contact-submissions', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'message' => 'Hello, enquiry.',
    ]);
    $response->assertCreated();
    expect(ContactSubmission::count())->toBeGreaterThan(0);
});

it('validates contact submission', function () {
    $response = $this->postJson('/api/v1/contact-submissions', ['name' => '', 'email' => 'bad', 'message' => '']);
    $response->assertStatus(422)->assertJsonValidationErrors(['email', 'message']);
});

it('search returns results', function () {
    $response = $this->getJson('/api/v1/search?q=copper');
    $response->assertOk()->assertJsonStructure(['data', 'meta']);
});

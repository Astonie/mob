<?php

use App\Models\Career;
use App\Models\CareerApplication;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->seed();
});

it('accepts a career application and stores the resume on the private disk', function () {
    $career = Career::where('status', 'open')->firstOrFail();

    $response = $this->postJson("/api/v1/careers/{$career->slug}/applications", [
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'email' => 'jane.doe@example.com',
        'resume' => UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf'),
    ]);

    $response->assertCreated();

    $application = CareerApplication::firstOrFail();
    expect($application->resume_path)->not->toBeNull();
    Storage::disk('private')->assertExists($application->resume_path);

    Storage::disk('private')->delete($application->resume_path);
});

it('rejects a career application without a resume', function () {
    $career = Career::where('status', 'open')->firstOrFail();

    $this->postJson("/api/v1/careers/{$career->slug}/applications", [
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'email' => 'jane.doe@example.com',
    ])->assertUnprocessable();
});

<?php

use App\Models\Project;
use App\Services\PublishingService;

it('publishes scheduled content whose schedule is due', function () {
    $due = Project::create([
        'name' => 'Due Scheduled',
        'slug' => 'due-scheduled',
        'status' => 'scheduled',
        'content_status' => 'scheduled',
        'scheduled_at' => now()->subMinute(),
    ]);

    $count = app(PublishingService::class)->publishScheduled();

    expect($count)->toBe(1);
    expect($due->fresh()->content_status)->toBe('published');
    expect($due->fresh()->published_at)->not->toBeNull();
});

it('does not publish scheduled content whose schedule is in the future', function () {
    $future = Project::create([
        'name' => 'Future Scheduled',
        'slug' => 'future-scheduled',
        'status' => 'scheduled',
        'content_status' => 'scheduled',
        'scheduled_at' => now()->addDay(),
    ]);

    $count = app(PublishingService::class)->publishScheduled();

    expect($count)->toBe(0);
    expect($future->fresh()->content_status)->toBe('scheduled');
});

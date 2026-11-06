<?php

use App\Services\PublishingService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(fn () => app(PublishingService::class)->publishScheduled())
    ->name('publish-scheduled-content')
    ->everyMinute()
    ->withoutOverlapping();

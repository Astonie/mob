<?php

namespace App\Services;

use App\Enums\ContentStatus;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class PublishingService
{
    public function publish(Model $model): Model
    {
        $this->assertTransition($model, ContentStatus::Published);
        $model->update([
            'status' => ContentStatus::Published->value,
            'content_status' => ContentStatus::Published->value,
            'published_at' => now(),
            'published_by' => Auth::id(),
        ]);

        return $model;
    }

    public function schedule(Model $model, \DateTimeInterface $when): Model
    {
        $model->update([
            'scheduled_at' => $when,
            'status' => ContentStatus::Scheduled->value,
            'content_status' => ContentStatus::Scheduled->value,
        ]);

        return $model;
    }

    public function archive(Model $model): Model
    {
        $model->update([
            'status' => ContentStatus::Archived->value,
            'content_status' => ContentStatus::Archived->value,
        ]);

        return $model;
    }

    public function submitForReview(Model $model): Model
    {
        $model->update([
            'status' => ContentStatus::Review->value,
            'content_status' => ContentStatus::Review->value,
        ]);

        return $model;
    }

    public function approve(Model $model): Model
    {
        $model->update([
            'status' => ContentStatus::Approved->value,
            'content_status' => ContentStatus::Approved->value,
        ]);

        return $model;
    }

    protected function assertTransition(Model $model, ContentStatus $target): void
    {
        $current = $model->status ?? $model->content_status ?? null;
        if ($current) {
            $currentEnum = ContentStatus::tryFrom($current);
            if ($currentEnum && ! $currentEnum->canTransitionTo($target)) {
                throw new \DomainException("Cannot transition from {$current} to {$target->value}");
            }
        }
    }

    public function publishScheduled(): int
    {
        $count = 0;
        $models = [
            NewsArticle::class,
            Page::class,
            Project::class,
        ];

        foreach ($models as $class) {
            $due = $class::where('status', ContentStatus::Scheduled->value)
                ->orWhere('content_status', ContentStatus::Scheduled->value)
                ->where('scheduled_at', '<=', now())
                ->get();

            foreach ($due as $model) {
                $model->update([
                    'status' => ContentStatus::Published->value,
                    'content_status' => ContentStatus::Published->value,
                    'published_at' => now(),
                ]);
                $count++;
            }
        }

        return $count;
    }
}

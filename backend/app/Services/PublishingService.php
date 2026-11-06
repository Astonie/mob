<?php

namespace App\Services;

use App\Enums\ContentStatus;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\Project;
use App\Support\Revalidate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class PublishingService
{
    public function publish(Model $model): Model
    {
        $this->assertTransition($model, ContentStatus::Published);
        $data = [
            'status' => ContentStatus::Published->value,
            'published_at' => now(),
            'published_by' => Auth::id(),
        ];
        $this->addContentStatus($model, $data, ContentStatus::Published->value);
        $model->update($data);

        return $model;
    }

    public function schedule(Model $model, \DateTimeInterface $when): Model
    {
        $data = [
            'scheduled_at' => $when,
            'status' => ContentStatus::Scheduled->value,
        ];
        $this->addContentStatus($model, $data, ContentStatus::Scheduled->value);
        $model->update($data);

        return $model;
    }

    public function archive(Model $model): Model
    {
        $data = [
            'status' => ContentStatus::Archived->value,
        ];
        $this->addContentStatus($model, $data, ContentStatus::Archived->value);
        $model->update($data);

        return $model;
    }

    public function submitForReview(Model $model): Model
    {
        $data = [
            'status' => ContentStatus::Review->value,
        ];
        $this->addContentStatus($model, $data, ContentStatus::Review->value);
        $model->update($data);

        return $model;
    }

    public function approve(Model $model): Model
    {
        $data = [
            'status' => ContentStatus::Approved->value,
        ];
        $this->addContentStatus($model, $data, ContentStatus::Approved->value);
        $model->update($data);

        return $model;
    }

    protected function addContentStatus(Model $model, array &$data, string $value): void
    {
        if (Schema::hasColumn($model->getTable(), 'content_status')) {
            $data['content_status'] = $value;
        }
    }

    protected function assertTransition(Model $model, ContentStatus $target): void
    {
        $current = $model->status ?? null;
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

        $previous = Revalidate::$force;
        Revalidate::$force = true;
        try {
            foreach ($models as $class) {
                $table = (new $class)->getTable();
                $hasContentStatus = Schema::hasColumn($table, 'content_status');
                $due = $class::where(function ($query) use ($hasContentStatus) {
                    $query->where('status', ContentStatus::Scheduled->value);
                    if ($hasContentStatus) {
                        $query->orWhere('content_status', ContentStatus::Scheduled->value);
                    }
                })
                    ->where('scheduled_at', '<=', now())
                    ->get();

                foreach ($due as $model) {
                    $data = [
                        'status' => ContentStatus::Published->value,
                        'published_at' => now(),
                    ];
                    if ($hasContentStatus) {
                        $data['content_status'] = ContentStatus::Published->value;
                    }
                    $model->update($data);
                    $count++;
                }
            }
        } finally {
            Revalidate::$force = $previous;
        }

        return $count;
    }
}

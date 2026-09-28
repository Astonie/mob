<?php

namespace App\Enums;

enum ContentStatus: string
{
    case Draft = 'draft';
    case Review = 'review';
    case Approved = 'approved';
    case Published = 'published';
    case Archived = 'archived';
    case Scheduled = 'scheduled';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function canTransitionTo(self $target): bool
    {
        return match ($this) {
            self::Draft => in_array($target, [self::Review, self::Draft, self::Archived]),
            self::Review => in_array($target, [self::Approved, self::Draft, self::Archived]),
            self::Approved => in_array($target, [self::Published, self::Scheduled, self::Draft]),
            self::Published => in_array($target, [self::Archived, self::Draft]),
            self::Scheduled => in_array($target, [self::Published, self::Draft, self::Archived]),
            self::Archived => in_array($target, [self::Draft]),
        };
    }

    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Draft',
            self::Review => 'In Review',
            self::Approved => 'Approved',
            self::Published => 'Published',
            self::Archived => 'Archived',
            self::Scheduled => 'Scheduled',
        };
    }
}

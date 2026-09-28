<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case Exploration = 'exploration';
    case Development = 'development';
    case Operation = 'operation';
    case CareAndMaintenance = 'care_and_maintenance';
    case Closed = 'closed';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}

<?php

namespace App\Filament\Resources\LeadershipProfiles\Pages;

use App\Filament\Resources\LeadershipProfiles\LeadershipProfileResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditLeadershipProfile extends EditRecord
{
    protected static string $resource = LeadershipProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}

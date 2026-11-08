<?php

namespace App\Filament\Resources\EsgContents\Pages;

use App\Filament\Resources\EsgContents\EsgContentResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditEsgContent extends EditRecord
{
    protected static string $resource = EsgContentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}

<?php

namespace App\Filament\Resources\Minerals\Pages;

use App\Filament\Resources\Minerals\MineralResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditMineral extends EditRecord
{
    protected static string $resource = MineralResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}

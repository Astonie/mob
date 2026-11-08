<?php

namespace App\Filament\Resources\Minerals\Pages;

use App\Filament\Resources\Minerals\MineralResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListMinerals extends ListRecords
{
    protected static string $resource = MineralResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

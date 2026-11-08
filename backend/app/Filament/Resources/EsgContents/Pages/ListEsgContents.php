<?php

namespace App\Filament\Resources\EsgContents\Pages;

use App\Filament\Resources\EsgContents\EsgContentResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListEsgContents extends ListRecords
{
    protected static string $resource = EsgContentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

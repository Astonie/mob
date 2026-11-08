<?php

namespace App\Filament\Resources\Minerals;

use App\Filament\Resources\Minerals\Pages\CreateMineral;
use App\Filament\Resources\Minerals\Pages\EditMineral;
use App\Filament\Resources\Minerals\Pages\ListMinerals;
use App\Filament\Resources\Minerals\Schemas\MineralForm;
use App\Filament\Resources\Minerals\Tables\MineralsTable;
use App\Models\Mineral;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MineralResource extends Resource
{
    protected static ?string $model = Mineral::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return MineralForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MineralsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMinerals::route('/'),
            'create' => CreateMineral::route('/create'),
            'edit' => EditMineral::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}

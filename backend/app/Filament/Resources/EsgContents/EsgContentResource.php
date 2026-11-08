<?php

namespace App\Filament\Resources\EsgContents;

use App\Filament\Resources\EsgContents\Pages\CreateEsgContent;
use App\Filament\Resources\EsgContents\Pages\EditEsgContent;
use App\Filament\Resources\EsgContents\Pages\ListEsgContents;
use App\Filament\Resources\EsgContents\Schemas\EsgContentForm;
use App\Filament\Resources\EsgContents\Tables\EsgContentsTable;
use App\Models\EsgContent;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EsgContentResource extends Resource
{
    protected static ?string $model = EsgContent::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return EsgContentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return EsgContentsTable::configure($table);
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
            'index' => ListEsgContents::route('/'),
            'create' => CreateEsgContent::route('/create'),
            'edit' => EditEsgContent::route('/{record}/edit'),
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

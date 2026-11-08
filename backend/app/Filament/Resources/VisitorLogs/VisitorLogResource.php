<?php

namespace App\Filament\Resources\VisitorLogs;

use App\Filament\Resources\VisitorLogs\Pages\CreateVisitorLog;
use App\Filament\Resources\VisitorLogs\Pages\EditVisitorLog;
use App\Filament\Resources\VisitorLogs\Pages\ListVisitorLogs;
use App\Filament\Resources\VisitorLogs\Schemas\VisitorLogForm;
use App\Filament\Resources\VisitorLogs\Tables\VisitorLogsTable;
use App\Models\VisitorLog;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class VisitorLogResource extends Resource
{
    protected static ?string $model = VisitorLog::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return VisitorLogForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VisitorLogsTable::configure($table);
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
            'index' => ListVisitorLogs::route('/'),
            'create' => CreateVisitorLog::route('/create'),
            'edit' => EditVisitorLog::route('/{record}/edit'),
        ];
    }
}

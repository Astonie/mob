<?php

namespace App\Filament\Resources\LeadershipProfiles;

use App\Filament\Resources\LeadershipProfiles\Pages\CreateLeadershipProfile;
use App\Filament\Resources\LeadershipProfiles\Pages\EditLeadershipProfile;
use App\Filament\Resources\LeadershipProfiles\Pages\ListLeadershipProfiles;
use App\Filament\Resources\LeadershipProfiles\Schemas\LeadershipProfileForm;
use App\Filament\Resources\LeadershipProfiles\Tables\LeadershipProfilesTable;
use App\Models\LeadershipProfile;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class LeadershipProfileResource extends Resource
{
    protected static ?string $model = LeadershipProfile::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return LeadershipProfileForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LeadershipProfilesTable::configure($table);
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
            'index' => ListLeadershipProfiles::route('/'),
            'create' => CreateLeadershipProfile::route('/create'),
            'edit' => EditLeadershipProfile::route('/{record}/edit'),
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

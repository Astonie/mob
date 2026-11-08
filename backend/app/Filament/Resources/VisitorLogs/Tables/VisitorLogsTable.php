<?php

namespace App\Filament\Resources\VisitorLogs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class VisitorLogsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('ip_address')->searchable()->sortable(),
                TextColumn::make('country')->sortable()->toggleable(),
                TextColumn::make('city')->toggleable(),
                TextColumn::make('path')->searchable()->limit(40),
                TextColumn::make('referer')->limit(40)->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                //
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}

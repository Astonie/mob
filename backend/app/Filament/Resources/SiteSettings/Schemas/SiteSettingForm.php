<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->required(),
                TextInput::make('value')
                    ->visible(fn ($get) => $get('type') !== 'image'),
                FileUpload::make('value')
                    ->image()
                    ->disk('public')
                    ->directory('settings')
                    ->visibility('public')
                    ->imageEditor()
                    ->maxSize(4096)
                    ->visible(fn ($get) => $get('type') === 'image'),
                TextInput::make('type')
                    ->required()
                    ->default('text'),
                TextInput::make('group')
                    ->required()
                    ->default('general'),
                Textarea::make('description')
                    ->columnSpanFull(),
                Toggle::make('is_public')
                    ->required(),
            ]);
    }
}

<?php

namespace App\Filament\Resources\Minerals\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class MineralForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('chemical_symbol'),
                TextInput::make('category'),
                Textarea::make('summary')
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->columnSpanFull(),
                Textarea::make('uses')
                    ->columnSpanFull(),
                TextInput::make('properties'),
                Textarea::make('importance')
                    ->columnSpanFull(),
                TextInput::make('color'),
                FileUpload::make('featured_image')
                    ->image()
                    ->disk('public')
                    ->directory('minerals')
                    ->visibility('public')
                    ->maxSize(4096)
                    ->fetchFileInformation(false),
                Toggle::make('is_featured')
                    ->required(),
                Toggle::make('is_active')
                    ->required(),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('status')
                    ->required()
                    ->default('published'),
                DateTimePicker::make('published_at'),
                TextInput::make('created_by')
                    ->numeric(),
                TextInput::make('updated_by')
                    ->numeric(),
            ]);
    }
}

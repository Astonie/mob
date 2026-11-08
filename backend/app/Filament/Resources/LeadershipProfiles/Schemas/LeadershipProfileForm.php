<?php

namespace App\Filament\Resources\LeadershipProfiles\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class LeadershipProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('position')
                    ->required(),
                TextInput::make('category')
                    ->required()
                    ->default('executive'),
                Textarea::make('bio')
                    ->columnSpanFull(),
                Textarea::make('full_bio')
                    ->columnSpanFull(),
                TextInput::make('photo'),
                TextInput::make('email')
                    ->label('Email address')
                    ->email(),
                TextInput::make('linkedin_url')
                    ->url(),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}

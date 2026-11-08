<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                DateTimePicker::make('email_verified_at'),
                TextInput::make('password')
                    ->password()
                    ->required(),
                Textarea::make('two_factor_secret')
                    ->columnSpanFull(),
                Toggle::make('two_factor_enabled')
                    ->required(),
                DateTimePicker::make('two_factor_confirmed_at'),
                TextInput::make('failed_login_attempts')
                    ->required()
                    ->numeric()
                    ->default(0),
                DateTimePicker::make('locked_until'),
                DateTimePicker::make('password_changed_at'),
                DateTimePicker::make('last_login_at'),
                TextInput::make('last_login_ip'),
            ]);
    }
}

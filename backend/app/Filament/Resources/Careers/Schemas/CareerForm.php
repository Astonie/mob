<?php

namespace App\Filament\Resources\Careers\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CareerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('department'),
                TextInput::make('location'),
                TextInput::make('location_id'),
                TextInput::make('employment_type')
                    ->required()
                    ->default('full_time'),
                TextInput::make('experience_level'),
                Textarea::make('summary')
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->columnSpanFull(),
                Textarea::make('requirements')
                    ->columnSpanFull(),
                Textarea::make('qualifications')
                    ->columnSpanFull(),
                Textarea::make('benefits')
                    ->columnSpanFull(),
                TextInput::make('salary_range'),
                DatePicker::make('deadline'),
                DateTimePicker::make('published_at'),
                TextInput::make('status')
                    ->required()
                    ->default('draft'),
                Toggle::make('is_featured')
                    ->required(),
                Toggle::make('is_active')
                    ->required(),
                TextInput::make('vacancies')
                    ->required()
                    ->numeric()
                    ->default(1),
                TextInput::make('created_by')
                    ->numeric(),
            ]);
    }
}

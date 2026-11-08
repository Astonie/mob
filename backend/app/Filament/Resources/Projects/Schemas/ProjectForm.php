<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                TextInput::make('code'),
                Textarea::make('summary')
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('location_id'),
                TextInput::make('country'),
                TextInput::make('region'),
                TextInput::make('latitude')
                    ->numeric(),
                TextInput::make('longitude')
                    ->numeric(),
                TextInput::make('status')
                    ->required()
                    ->default('exploration'),
                TextInput::make('stage'),
                TextInput::make('project_type'),
                TextInput::make('ownership_percentage'),
                TextInput::make('ownership_structure'),
                DatePicker::make('start_date'),
                DatePicker::make('end_date'),
                TextInput::make('production_info'),
                TextInput::make('production_data'),
                TextInput::make('esg_data'),
                Toggle::make('is_featured')
                    ->required(),
                Toggle::make('is_active')
                    ->required(),
                TextInput::make('sort_order')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('content_status')
                    ->required()
                    ->default('draft'),
                DateTimePicker::make('published_at'),
                DateTimePicker::make('scheduled_at'),
                TextInput::make('created_by')
                    ->numeric(),
                TextInput::make('updated_by')
                    ->numeric(),
            ]);
    }
}

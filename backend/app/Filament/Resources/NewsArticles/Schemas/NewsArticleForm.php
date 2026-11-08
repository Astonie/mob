<?php

namespace App\Filament\Resources\NewsArticles\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class NewsArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                Textarea::make('excerpt')
                    ->columnSpanFull(),
                Textarea::make('content')
                    ->columnSpanFull(),
                TextInput::make('content_blocks'),
                TextInput::make('category_id'),
                FileUpload::make('featured_image')
                    ->image()
                    ->disk('public')
                    ->directory('news')
                    ->visibility('public')
                    ->imageEditor()
                    ->maxSize(4096),
                FileUpload::make('gallery')
                    ->image()
                    ->multiple()
                    ->disk('public')
                    ->directory('news/gallery')
                    ->visibility('public')
                    ->maxSize(4096),
                TextInput::make('status')
                    ->required()
                    ->default('draft'),
                Toggle::make('is_featured')
                    ->required(),
                DateTimePicker::make('published_at'),
                DateTimePicker::make('scheduled_at'),
                TextInput::make('author_id')
                    ->numeric(),
                TextInput::make('reviewed_by')
                    ->numeric(),
                TextInput::make('published_by')
                    ->numeric(),
                TextInput::make('views_count')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('seo_data'),
            ]);
    }
}

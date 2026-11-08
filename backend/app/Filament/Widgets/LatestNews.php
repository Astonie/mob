<?php

namespace App\Filament\Widgets;

use App\Models\NewsArticle;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class LatestNews extends TableWidget
{
    protected static ?string $heading = 'Latest News';

    public function table(Table $table): Table
    {
        return $table
            ->query(fn (): Builder => NewsArticle::query()->latest('published_at')->limit(5))
            ->columns([
                TextColumn::make('title')->limit(40),
                TextColumn::make('status')->badge(),
                TextColumn::make('published_at')->dateTime()->sortable(),
            ])
            ->paginated(false);
    }
}

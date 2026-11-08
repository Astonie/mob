<?php

namespace App\Filament\Widgets;

use App\Models\Career;
use App\Models\LeadershipProfile;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\Project;
use App\Models\VisitorLog;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Pages', Page::count())
                ->description('Published: '.Page::where('status', 'published')->count())
                ->color('primary'),
            Stat::make('News Articles', NewsArticle::count())
                ->description('Published: '.NewsArticle::where('status', 'published')->count())
                ->color('primary'),
            Stat::make('Projects', Project::count())
                ->description('Published: '.Project::where('content_status', 'published')->count())
                ->color('primary'),
            Stat::make('Careers', Career::where('status', 'open')->count())
                ->description('Open positions')
                ->color('success'),
            Stat::make('Leadership', LeadershipProfile::where('is_active', true)->count())
                ->description('Active profiles')
                ->color('primary'),
            Stat::make('Unique Visitors', VisitorLog::distinct('ip_address')->count('ip_address'))
                ->description('Today: '.VisitorLog::whereDate('created_at', today())->distinct('ip_address')->count('ip_address'))
                ->color('info'),
        ];
    }
}

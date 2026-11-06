<?php

namespace App\Providers;

use App\Contracts\SearchEngine;
use App\Models\Career;
use App\Models\EsgContent;
use App\Models\Faq;
use App\Models\LeadershipProfile;
use App\Models\Mineral;
use App\Models\NavigationItem;
use App\Models\NavigationMenu;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\User;
use App\Services\DatabaseSearchEngine;
use App\Support\Revalidate;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(SearchEngine::class, DatabaseSearchEngine::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // super-admin bypasses every permission/role check.
        Gate::before(fn (User $user) => $user->hasRole('super-admin') ? true : null);

        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(120)->by($request->user()?->id ?: $request->ip());
        });

        RateLimiter::for('contact', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });

        $this->revalidateOnContentChange();
    }

    /**
     * Bust the Next.js ISR cache whenever public content changes.
     */
    private function revalidateOnContentChange(): void
    {
        $map = [
            SiteSetting::class => fn (SiteSetting $m) => ['settings'],
            Page::class => fn (Page $m) => ['page:'.$m->slug],
            Project::class => fn (Project $m) => ['projects', 'project:'.$m->slug],
            Mineral::class => fn (Mineral $m) => ['minerals', 'mineral:'.$m->slug],
            NewsArticle::class => fn (NewsArticle $m) => ['news', 'news:'.$m->slug],
            Career::class => fn (Career $m) => ['careers', 'career:'.$m->slug],
            NavigationMenu::class => fn () => ['nav:main', 'nav:footer'],
            NavigationItem::class => fn () => ['nav:main', 'nav:footer'],
            EsgContent::class => fn () => ['esg'],
            Faq::class => fn () => ['faq'],
            LeadershipProfile::class => fn () => ['leadership'],
        ];

        foreach ($map as $class => $tagsFor) {
            $class::saved(fn ($model) => Revalidate::tags(...$tagsFor($model)));
            $class::deleted(fn ($model) => Revalidate::tags(...$tagsFor($model)));
        }
    }
}

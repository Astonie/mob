<?php

namespace App\Providers\Filament;

use App\Filament\Widgets\LatestNews;
use App\Filament\Widgets\StatsOverview;
use App\Models\SiteSetting;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets\AccountWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->passwordReset()
            ->colors([
                'primary' => Color::hex('#0F4A6B'),
                'gray' => Color::Slate,
            ])
            ->brandName('Mob Limited CMS')
            ->brandLogo(function () {
                $value = SiteSetting::where('key', 'site.logo_light')->value('value');
                if (! $value) {
                    return asset('logo-mob.svg');
                }
                if (str_starts_with($value, 'http') || str_starts_with($value, '/')) {
                    return str_starts_with($value, '/') ? asset(ltrim($value, '/')) : $value;
                }

                return asset('storage/'.ltrim($value, '/'));
            })
            ->brandLogoHeight('2.5rem')
            ->favicon(function () {
                $value = SiteSetting::where('key', 'site.logo_light')->value('value');
                if (! $value) {
                    return asset('favicon.ico');
                }
                if (str_starts_with($value, 'http') || str_starts_with($value, '/')) {
                    return str_starts_with($value, '/') ? asset(ltrim($value, '/')) : $value;
                }

                return asset('storage/'.ltrim($value, '/'));
            })
            ->darkMode(false)
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                StatsOverview::class,
                LatestNews::class,
                AccountWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                PreventRequestForgery::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}

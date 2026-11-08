<?php

use App\Models\Career;
use App\Models\LeadershipProfile;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $home = Page::with('blocks')->where('slug', 'home')->where('status', 'published')->firstOrFail();
    $services = Page::with('blocks')->where('slug', 'services')->where('status', 'published')->first();
    $news = NewsArticle::where('status', 'published')->latest('published_at')->take(3)->get();
    $projects = Project::where('content_status', 'published')->where('is_active', true)->take(6)->get();

    return view('pages.home', compact('home', 'services', 'news', 'projects'));
});

Route::get('/about', function () {
    $page = Page::with('blocks')->where('slug', 'about')->where('status', 'published')->firstOrFail();
    $leaders = LeadershipProfile::where('is_active', true)->orderBy('sort_order')->get();

    return view('pages.about', compact('page', 'leaders'));
});

Route::get('/services', function () {
    $page = Page::with('blocks')->where('slug', 'services')->where('status', 'published')->firstOrFail();
    $serviceSlugs = ['geological-services','mineral-exploration','surveying-gis-remote-sensing','geophysical-services','mining-consultancy','environmental-regulatory-services','project-management-technical-support'];
    $servicePages = Page::where('status', 'published')->whereIn('slug', $serviceSlugs)->orderBy('sort_order')->get();

    return view('pages.services', compact('page', 'servicePages'));
});

Route::get('/services/{slug}', function (string $slug) {
    $page = Page::with('blocks')->where('slug', $slug)->where('status', 'published')->firstOrFail();

    return view('pages.service-detail', compact('page'));
});

Route::get('/team', function () {
    $leaders = LeadershipProfile::where('is_active', true)->orderBy('sort_order')->get();

    return view('pages.team', compact('leaders'));
});

Route::get('/news', function () {
    $page = Page::where('slug', 'news')->first();
    if ($page && $page->status !== 'published') {
        abort(404);
    }
    $news = NewsArticle::where('status', 'published')->latest('published_at')->paginate(12);

    return view('pages.news', compact('news'));
});

Route::get('/news/{slug}', function (string $slug) {
    $article = NewsArticle::where('slug', $slug)->where('status', 'published')->firstOrFail();

    return view('pages.news-detail', compact('article'));
});

Route::get('/careers', function () {
    $page = Page::where('slug', 'careers')->first();
    if ($page && $page->status !== 'published') {
        abort(404);
    }
    $careers = Career::where('status', 'open')->where('is_active', true)->latest('published_at')->paginate(12);

    return view('pages.careers', compact('careers'));
});

Route::get('/careers/{slug}', function (string $slug) {
    $career = Career::where('slug', $slug)->where('status', 'open')->firstOrFail();

    return view('pages.career-detail', compact('career'));
});

Route::get('/contact', function () {
    $page = Page::where('slug', 'contact')->first();
    if ($page && $page->status !== 'published') {
        abort(404);
    }

    return view('pages.contact');
});

Route::get('/search', function (Request $request) {
    $q = trim($request->query('q', ''));
    $results = collect();
    if (strlen($q) >= 2) {
        $results = \App\Models\NewsArticle::where('status', 'published')
            ->where(function ($query) use ($q) {
                $query->where('title', 'like', "%{$q}%")
                    ->orWhere('excerpt', 'like', "%{$q}%")
                    ->orWhere('content', 'like', "%{$q}%");
            })
            ->latest('published_at')
            ->take(20)
            ->get();
    }

    return view('pages.search', compact('q', 'results'));
});

Route::get('/sitemap.xml', function () {
    $pages = Page::where('status', 'published')->get();
    $news = NewsArticle::where('status', 'published')->get();

    return response()->view('sitemap', compact('pages', 'news'), 200, ['Content-Type' => 'application/xml']);
});

// Legacy Blade admin (disabled in favor of Filament at /admin)
// Route::get('/admin/login', [\App\Http\Controllers\Admin\AuthController::class, 'showLogin'])->name('admin.login');
// Route::post('/admin/login', [\App\Http\Controllers\Admin\AuthController::class, 'login']);
// Route::post('/admin/logout', [\App\Http\Controllers\Admin\AuthController::class, 'logout'])->middleware('auth');
// Route::middleware('auth')->prefix('admin')->group(function () {
//     Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');
//     Route::resource('pages', \App\Http\Controllers\Admin\PageController::class)->except(['show']);
// });

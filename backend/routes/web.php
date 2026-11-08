<?php

use App\Models\Career;
use App\Models\LeadershipProfile;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $home = Page::with('blocks')->where('slug', 'home')->where('status', 'published')->first();
    $services = Page::with('blocks')->where('slug', 'services')->where('status', 'published')->first();
    $news = NewsArticle::where('status', 'published')->latest('published_at')->take(3)->get();
    $projects = Project::where('content_status', 'published')->where('is_active', true)->take(6)->get();

    return view('pages.home', compact('home', 'services', 'news', 'projects'));
});

Route::get('/about', function () {
    $page = Page::with('blocks')->where('slug', 'about')->where('status', 'published')->first();
    $leaders = LeadershipProfile::where('is_active', true)->orderBy('sort_order')->get();

    return view('pages.about', compact('page', 'leaders'));
});

Route::get('/services', function () {
    $page = Page::with('blocks')->where('slug', 'services')->where('status', 'published')->first();
    $servicePages = Page::where('status', 'published')->where('slug', '!=', 'services')->orderBy('sort_order')->get();

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
    $news = NewsArticle::where('status', 'published')->latest('published_at')->paginate(12);

    return view('pages.news', compact('news'));
});

Route::get('/news/{slug}', function (string $slug) {
    $article = NewsArticle::where('slug', $slug)->where('status', 'published')->firstOrFail();

    return view('pages.news-detail', compact('article'));
});

Route::get('/careers', function () {
    $careers = Career::where('status', 'open')->where('is_active', true)->latest('published_at')->paginate(12);

    return view('pages.careers', compact('careers'));
});

Route::get('/careers/{slug}', function (string $slug) {
    $career = Career::where('slug', $slug)->where('status', 'open')->firstOrFail();

    return view('pages.career-detail', compact('career'));
});

Route::get('/contact', function () {
    return view('pages.contact');
});

Route::get('/search', function (Request $request) {
    $q = $request->query('q', '');

    return view('pages.search', compact('q'));
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

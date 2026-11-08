<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$publishedSlugs = \App\Models\Page::where('status','published')->pluck('slug')->toArray();
$navItems = [
    ['/', 'Home'],
    ['/about', 'About'],
    ['/services', 'Our Services'],
    ['/team', 'Our Team'],
    ['/news', 'News'],
    ['/careers', 'Careers'],
    ['/contact', 'Contact'],
];
$visibleNav = [];
foreach ($navItems as [$url, $label]) {
    $slug = trim($url, '/');
    if ($url === '/' || ! \App\Models\Page::where('slug', $slug)->exists() || in_array($slug, $publishedSlugs)) {
        $visibleNav[] = [$url, $label];
    }
}
foreach ($visibleNav as [$url, $label]) {
    echo $label . "\n";
}

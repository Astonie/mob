<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
$publishedSlugs = \App\Models\Page::where('status','published')->pluck('slug')->toArray();
var_dump($publishedSlugs);
$slug = 'news';
echo "exists: " . (\App\Models\Page::where('slug',$slug)->exists() ? 'yes' : 'no') . PHP_EOL;
echo "in_array: " . (in_array($slug, $publishedSlugs) ? 'yes' : 'no') . PHP_EOL;

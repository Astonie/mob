<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
$p = App\Models\Page::where('slug', 'news')->first();
echo 'status:' . $p->status . PHP_EOL;
echo 'count published: ' . App\Models\Page::where('status','published')->count() . PHP_EOL;

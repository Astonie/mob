<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
$slugs = ['geological-services','mineral-exploration','surveying-gis-remote-sensing','geophysical-services','mining-consultancy','environmental-regulatory-services','project-management-technical-support'];
$pages = App\Models\Page::where('status','published')->whereIn('slug', $slugs)->get();
echo 'count: ' . $pages->count() . PHP_EOL;
foreach ($pages as $p) { echo $p->slug . PHP_EOL; }

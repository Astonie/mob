<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
$p = App\Models\Page::where('slug', 'home')->first();
echo 'status:' . $p->status . PHP_EOL;
echo 'hero_image:' . ($p->hero_image ?? 'null') . PHP_EOL;

<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
$pages = App\Models\Page::where('slug','home')->get();
echo "count: " . $pages->count() . PHP_EOL;
foreach ($pages as $p) {
    echo "id: " . $p->id . " status: " . $p->status . PHP_EOL;
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\Project;

class DashboardController extends Controller
{
    public function index()
    {
        return view('admin.dashboard', [
            'pages' => Page::count(),
            'news' => NewsArticle::count(),
            'projects' => Project::count(),
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Career;
use App\Models\ContactSubmission;
use App\Models\MediaAsset;
use App\Models\NewsArticle;
use App\Models\Page;
use App\Models\Project;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        return response()->json([
            'data' => [
                'stats' => [
                    'projects_total' => Project::count(),
                    'projects_published' => Project::where('content_status', 'published')->count(),
                    'projects_draft' => Project::where('content_status', 'draft')->count(),
                    'news_total' => NewsArticle::count(),
                    'news_published' => NewsArticle::where('status', 'published')->count(),
                    'news_draft' => NewsArticle::where('status', 'draft')->count(),
                    'pages_total' => Page::count(),
                    'careers_open' => Career::where('status', 'open')->count(),
                    'contact_new' => ContactSubmission::where('status', 'new')->count(),
                    'media_total' => MediaAsset::count(),
                    'media_size_mb' => round(MediaAsset::sum('size') / 1024 / 1024, 2),
                ],
                'recent_news' => NewsArticle::with('category')->latest()->limit(5)->get(['id', 'title', 'slug', 'status', 'published_at']),
                'pending_reviews' => NewsArticle::where('status', 'review')->limit(5)->get(['id', 'title', 'slug']),
                'recent_projects' => Project::latest()->limit(5)->get(['id', 'name', 'slug', 'content_status']),
                'recent_contacts' => ContactSubmission::latest()->limit(5)->get(['id', 'name', 'email', 'subject', 'status']),
            ],
        ]);
    }
}

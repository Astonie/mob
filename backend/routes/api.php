<?php

use App\Http\Controllers\Api\V1\Admin\AuthController;
use App\Http\Controllers\Api\V1\Admin\DashboardController;
use App\Http\Controllers\Api\V1\Admin\LocationAdminController;
use App\Http\Controllers\Api\V1\Admin\MineralAdminController;
use App\Http\Controllers\Api\V1\Admin\NavigationAdminController;
use App\Http\Controllers\Api\V1\Admin\NewsAdminController;
use App\Http\Controllers\Api\V1\Admin\PageAdminController;
use App\Http\Controllers\Api\V1\Admin\ProjectAdminController;
use App\Http\Controllers\Api\V1\Public\CareerApplicationController;
use App\Http\Controllers\Api\V1\Public\CareerController;
use App\Http\Controllers\Api\V1\Public\ContactController;
use App\Http\Controllers\Api\V1\Public\HealthController;
use App\Http\Controllers\Api\V1\Public\MineralController;
use App\Http\Controllers\Api\V1\Public\NavigationController;
use App\Http\Controllers\Api\V1\Public\NewsController;
use App\Http\Controllers\Api\V1\Public\PageController;
use App\Http\Controllers\Api\V1\Public\ProjectController;
use App\Http\Controllers\Api\V1\Public\SearchController;
use App\Models\AuditLog;
use App\Models\CareerApplication;
use App\Models\ContactSubmission;
use App\Models\MediaAsset;
use App\Models\Revision;
use App\Models\SiteSetting;
use App\Models\SupplierRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - v1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // Public
    Route::get('/health', HealthController::class);
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);
    Route::get('/minerals', [MineralController::class, 'index']);
    Route::get('/minerals/{slug}', [MineralController::class, 'show']);
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{slug}', [NewsController::class, 'show']);
    Route::get('/pages', [PageController::class, 'index']);
    Route::get('/pages/{slug}', [PageController::class, 'show']);
    Route::get('/navigation', [NavigationController::class, 'show']);
    Route::get('/careers', [CareerController::class, 'index']);
    Route::get('/careers/{slug}', [CareerController::class, 'show']);
    Route::get('/search', SearchController::class);
    Route::post('/contact-submissions', [ContactController::class, 'store'])->middleware('throttle:5,1');
    Route::post('/careers/{slug}/applications', [CareerApplicationController::class, 'store'])->middleware('throttle:10,1');

    Route::get('/site-settings', function () {
        return response()->json(['data' => SiteSetting::where('is_public', true)->pluck('value', 'key')]);
    });

    // Public locations
    Route::get('/locations', function () {
        return \App\Models\Location::latest()->get();
    });

    // Auth
    Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);
    });

    // Admin (auth + throttle)
    Route::prefix('admin')->middleware(['auth:sanctum', 'throttle:120,1'])->group(function () {
        Route::get('/dashboard', DashboardController::class);

        Route::apiResource('projects', ProjectAdminController::class);
        Route::post('projects/{project}/publish', [ProjectAdminController::class, 'publish']);

        Route::apiResource('minerals', MineralAdminController::class);
        Route::apiResource('news', NewsAdminController::class);
        Route::post('news/{newsArticle}/publish', [NewsAdminController::class, 'publish']);

        Route::apiResource('pages', PageAdminController::class);
        Route::post('pages/{page}/reorder', [PageAdminController::class, 'reorder']);

        // Media upload
        Route::post('media/upload', function (Request $request) {
            $request->validate(['file' => ['required', 'file', 'max:10240', 'mimes:jpg,jpeg,png,webp,pdf,doc,docx']]);
            $file = $request->file('file');
            $path = $file->store('media/'.date('Y/m'), 'public');
            $media = MediaAsset::create([
                'file_name' => basename($path),
                'original_name' => $file->getClientOriginalName(),
                'path' => $path,
                'disk' => 'public',
                'mime_type' => $file->getMimeType(),
                'extension' => $file->getClientOriginalExtension(),
                'size' => $file->getSize(),
                'folder' => $request->string('folder', 'general'),
                'uploaded_by' => $request->user()->id,
            ]);

            return response()->json(['data' => $media], 201);
        });

        Route::get('audit-logs', function (Request $request) {
            return AuditLog::with('user')->latest()->paginate($request->integer('per_page', 20));
        });

        Route::get('revisions', function (Request $request) {
            return Revision::with('user')->latest()->paginate($request->integer('per_page', 20));
        });

        // Navigation admin
        Route::apiResource('navigation-menus', NavigationAdminController::class)->parameters(['navigation-menus' => 'navigationMenu']);

        // Locations
        Route::apiResource('locations', LocationAdminController::class);

        // Document & other stubs
        Route::get('career-applications', function () {
            return CareerApplication::with('career')->latest()->paginate(20);
        });
        Route::get('contact-submissions', function () {
            return ContactSubmission::latest()->paginate(20);
        });
        Route::get('supplier-registrations', function () {
            return SupplierRegistration::latest()->paginate(20);
        });
    });
});

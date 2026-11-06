<?php

use App\Http\Controllers\Api\V1\Admin\AuthController;
use App\Http\Controllers\Api\V1\Admin\CareerAdminController;
use App\Http\Controllers\Api\V1\Admin\DashboardController;
use App\Http\Controllers\Api\V1\Admin\EsgAdminController;
use App\Http\Controllers\Api\V1\Admin\FaqAdminController;
use App\Http\Controllers\Api\V1\Admin\LeadershipAdminController;
use App\Http\Controllers\Api\V1\Admin\LocationAdminController;
use App\Http\Controllers\Api\V1\Admin\MineralAdminController;
use App\Http\Controllers\Api\V1\Admin\NavigationAdminController;
use App\Http\Controllers\Api\V1\Admin\NavigationItemAdminController;
use App\Http\Controllers\Api\V1\Admin\NewsAdminController;
use App\Http\Controllers\Api\V1\Admin\PageAdminController;
use App\Http\Controllers\Api\V1\Admin\ProjectAdminController;
use App\Http\Controllers\Api\V1\Admin\SiteSettingAdminController;
use App\Http\Controllers\Api\V1\Admin\UserAdminController;
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
use App\Models\EsgContent;
use App\Models\Faq;
use App\Models\LeadershipProfile;
use App\Models\Location;
use App\Models\MediaAsset;
use App\Models\Revision;
use App\Models\SiteSetting;
use App\Models\SupplierRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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

    // Public content: sustainability, FAQ, leadership
    Route::get('/esg-contents', function () {
        return EsgContent::where('is_active', true)
            ->where('status', 'published')
            ->orderBy('sort_order')
            ->get(['id', 'title', 'slug', 'category', 'summary', 'content', 'featured_image', 'metrics', 'sort_order', 'published_at']);
    });

    Route::get('/faqs', function () {
        return Faq::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'question', 'answer', 'category', 'sort_order']);
    });

    Route::get('/leadership', function () {
        return LeadershipProfile::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'position', 'category', 'bio', 'full_bio', 'photo', 'linkedin_url']);
    });

    // Public locations
    Route::get('/locations', function () {
        return Location::latest()->get();
    });

    // Auth
    Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:10,1')->name('login');
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:5,1')->name('password.forgot');
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:5,1')->name('password.reset');
    Route::post('/auth/two-factor/verify', [AuthController::class, 'verifyTwoFactor'])->middleware('throttle:10,1')->name('two-factor.verify');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::post('/auth/two-factor/setup', [AuthController::class, 'twoFactorSetup']);
        Route::post('/auth/two-factor/confirm', [AuthController::class, 'twoFactorConfirm']);
        Route::post('/auth/two-factor/disable', [AuthController::class, 'twoFactorDisable']);
        Route::post('/auth/password/change', [AuthController::class, 'changePassword']);
        Route::get('/auth/sessions', [AuthController::class, 'sessions']);
        Route::delete('/auth/sessions/{id}', [AuthController::class, 'revokeSession']);
        Route::post('/auth/sessions/revoke-all', [AuthController::class, 'revokeAllSessions']);
    });

    // Admin (auth + throttle + per-resource permissions)
    Route::prefix('admin')->middleware(['auth:sanctum', 'throttle:120,1'])->group(function () {
        Route::get('/dashboard', DashboardController::class);

        // Site settings (all public site copy)
        Route::middleware('permission:settings.manage')->group(function () {
            Route::get('site-settings', [SiteSettingAdminController::class, 'index']);
            Route::post('site-settings', [SiteSettingAdminController::class, 'store']);
            Route::put('site-settings/{key}', [SiteSettingAdminController::class, 'update']);
            Route::delete('site-settings/{key}', [SiteSettingAdminController::class, 'destroy']);
        });

        Route::apiResource('projects', ProjectAdminController::class)
            ->middlewareFor('index', 'permission:projects.view')
            ->middlewareFor('show', 'permission:projects.view')
            ->middlewareFor('store', 'permission:projects.create')
            ->middlewareFor('update', 'permission:projects.update')
            ->middlewareFor('destroy', 'permission:projects.delete');
        Route::post('projects/{project}/publish', [ProjectAdminController::class, 'publish'])->middleware('permission:projects.publish');

        Route::apiResource('minerals', MineralAdminController::class)
            ->middlewareFor('index', 'permission:minerals.view')
            ->middlewareFor('show', 'permission:minerals.view')
            ->middlewareFor('store', 'permission:minerals.create')
            ->middlewareFor('update', 'permission:minerals.update')
            ->middlewareFor('destroy', 'permission:minerals.delete');

        Route::apiResource('news', NewsAdminController::class)
            ->middlewareFor('index', 'permission:news.view')
            ->middlewareFor('show', 'permission:news.view')
            ->middlewareFor('store', 'permission:news.create')
            ->middlewareFor('update', 'permission:news.update')
            ->middlewareFor('destroy', 'permission:news.delete');
        Route::post('news/{newsArticle}/publish', [NewsAdminController::class, 'publish'])->middleware('permission:news.publish');

        Route::apiResource('pages', PageAdminController::class)
            ->middlewareFor('index', 'permission:pages.view')
            ->middlewareFor('show', 'permission:pages.view')
            ->middlewareFor('store', 'permission:pages.create')
            ->middlewareFor('update', 'permission:pages.update')
            ->middlewareFor('destroy', 'permission:pages.delete');
        Route::post('pages/{page}/reorder', [PageAdminController::class, 'reorder'])->middleware('permission:pages.update');

        // Content: sustainability/ESG, FAQ, leadership, careers
        Route::apiResource('esg-contents', EsgAdminController::class)
            ->parameters(['esg-contents' => 'esgContent'])
            ->middlewareFor('index', 'permission:pages.view')
            ->middlewareFor('show', 'permission:pages.view')
            ->middlewareFor('store', 'permission:pages.create')
            ->middlewareFor('update', 'permission:pages.update')
            ->middlewareFor('destroy', 'permission:pages.delete');
        Route::apiResource('faqs', FaqAdminController::class)
            ->middlewareFor('index', 'permission:pages.view')
            ->middlewareFor('show', 'permission:pages.view')
            ->middlewareFor('store', 'permission:pages.create')
            ->middlewareFor('update', 'permission:pages.update')
            ->middlewareFor('destroy', 'permission:pages.delete');
        Route::apiResource('leadership-profiles', LeadershipAdminController::class)
            ->parameters(['leadership-profiles' => 'leadershipProfile'])
            ->middlewareFor('index', 'permission:leadership.view')
            ->middlewareFor('show', 'permission:leadership.view')
            ->middlewareFor('store', 'permission:leadership.create')
            ->middlewareFor('update', 'permission:leadership.update')
            ->middlewareFor('destroy', 'permission:leadership.delete');
        Route::apiResource('careers', CareerAdminController::class)
            ->middlewareFor('index', 'permission:careers.view')
            ->middlewareFor('show', 'permission:careers.view')
            ->middlewareFor('store', 'permission:careers.create')
            ->middlewareFor('update', 'permission:careers.update')
            ->middlewareFor('destroy', 'permission:careers.delete');

        // Media upload / library
        Route::get('media', function (Request $request) {
            return MediaAsset::latest()->paginate(min($request->integer('per_page', 24), 100));
        })->middleware('permission:media.view');
        Route::delete('media/{mediaAsset}', function (MediaAsset $mediaAsset) {
            Storage::disk($mediaAsset->disk)->delete($mediaAsset->path);
            $mediaAsset->delete();

            return response()->json(['message' => 'Deleted']);
        })->middleware('permission:media.delete');
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
        })->middleware('permission:media.create');

        Route::get('audit-logs', function (Request $request) {
            return AuditLog::with('user')->latest()->paginate(min($request->integer('per_page', 20), 100));
        })->middleware('permission:audit.view');

        Route::get('revisions', function (Request $request) {
            return Revision::with('user')->latest()->paginate(min($request->integer('per_page', 20), 100));
        })->middleware('permission:pages.view');

        // Navigation admin (menus + items)
        Route::apiResource('navigation-menus', NavigationAdminController::class)
            ->parameters(['navigation-menus' => 'navigationMenu'])
            ->middleware('permission:navigation.manage');
        Route::post('navigation-menus/{navigationMenu}/items', [NavigationItemAdminController::class, 'store'])->middleware('permission:navigation.manage');
        Route::put('navigation-items/{navigationItem}', [NavigationItemAdminController::class, 'update'])->middleware('permission:navigation.manage');
        Route::delete('navigation-items/{navigationItem}', [NavigationItemAdminController::class, 'destroy'])->middleware('permission:navigation.manage');

        // Users & roles (security)
        Route::get('users', [UserAdminController::class, 'index'])->middleware('permission:users.manage');
        Route::post('users', [UserAdminController::class, 'store'])->middleware('permission:users.manage');
        Route::put('users/{user}', [UserAdminController::class, 'update'])->middleware('permission:users.manage');
        Route::delete('users/{user}', [UserAdminController::class, 'destroy'])->middleware('permission:users.manage');
        Route::get('roles', [UserAdminController::class, 'roles'])->middleware('permission:users.manage');

        // Locations
        Route::apiResource('locations', LocationAdminController::class)
            ->middlewareFor('index', 'permission:pages.view')
            ->middlewareFor('show', 'permission:pages.view')
            ->middlewareFor('store', 'permission:pages.create')
            ->middlewareFor('update', 'permission:pages.update')
            ->middlewareFor('destroy', 'permission:pages.delete');

        // Document & other stubs
        Route::get('career-applications', function () {
            return CareerApplication::with('career')->latest()->paginate(20);
        })->middleware('permission:career_applications.view');
        Route::patch('career-applications/{careerApplication}', function (Request $request, CareerApplication $careerApplication) {
            $data = $request->validate([
                'status' => ['sometimes', 'in:pending,reviewed,shortlisted,rejected,hired'],
                'internal_notes' => ['nullable', 'string'],
            ]);
            if (($data['status'] ?? null) === 'reviewed' && ! $careerApplication->reviewed_at) {
                $data['reviewed_at'] = now();
                $data['reviewed_by'] = $request->user()->id;
            }
            $careerApplication->update($data);

            return response()->json(['data' => $careerApplication]);
        })->middleware('permission:career_applications.view');
        Route::get('contact-submissions', function () {
            return ContactSubmission::latest()->paginate(20);
        })->middleware('permission:contact_submissions.view');
        Route::patch('contact-submissions/{contactSubmission}', function (Request $request, ContactSubmission $contactSubmission) {
            $data = $request->validate([
                'status' => ['sometimes', 'in:new,read,replied,archived,spam'],
                'internal_notes' => ['nullable', 'string'],
            ]);
            if (($data['status'] ?? null) === 'read' && ! $contactSubmission->read_at) {
                $data['read_at'] = now();
            }
            $contactSubmission->update($data);

            return response()->json(['data' => $contactSubmission]);
        })->middleware('permission:contact_submissions.manage');
        Route::get('supplier-registrations', function () {
            return SupplierRegistration::latest()->paginate(20);
        })->middleware('permission:procurement.view');
        Route::patch('supplier-registrations/{supplierRegistration}', function (Request $request, SupplierRegistration $supplierRegistration) {
            $data = $request->validate([
                'status' => ['sometimes', 'in:pending,approved,rejected,suspended'],
            ]);
            $supplierRegistration->update($data);

            return response()->json(['data' => $supplierRegistration]);
        })->middleware('permission:procurement.update');
    });
});

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('template')->default('default');
            $table->text('excerpt')->nullable();
            $table->string('status')->default('draft'); // draft, review, approved, published, archived
            $table->boolean('is_homepage')->default(false);
            $table->boolean('show_in_navigation')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->json('seo_data')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('published_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index('status');
            $table->index('is_homepage');
        });

        Schema::create('page_blocks', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('page_id')->constrained('pages')->cascadeOnDelete();
            $table->string('type'); // hero, rich_text, image, gallery, etc
            $table->json('data'); // structured block data
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['page_id', 'sort_order']);
        });

        Schema::create('navigation_menus', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique(); // main, footer, mobile
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('navigation_items', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('navigation_menu_id')->constrained('navigation_menus')->cascadeOnDelete();
            $table->string('parent_id')->nullable()->index();
            $table->string('title');
            $table->string('url')->nullable();
            $table->string('type')->default('internal'); // internal, external, page, project, mineral
            $table->string('target')->default('_self');
            $table->foreignUlid('page_id')->nullable()->constrained('pages')->nullOnDelete();
            $table->string('icon')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['navigation_menu_id', 'parent_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('navigation_items');
        Schema::dropIfExists('navigation_menus');
        Schema::dropIfExists('page_blocks');
        Schema::dropIfExists('pages');
    }
};

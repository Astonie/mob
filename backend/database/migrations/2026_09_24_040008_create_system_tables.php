<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('key')->unique();
            $table->json('value')->nullable();
            $table->string('type')->default('text'); // text, json, boolean, number, image
            $table->string('group')->default('general'); // general, seo, contact, social, appearance
            $table->text('description')->nullable();
            $table->boolean('is_public')->default(true); // if false, only admin can see
            $table->timestamps();
            $table->index('group');
        });

        Schema::create('seo_settings', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('seoable_type')->nullable();
            $table->string('seoable_id')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('canonical_url')->nullable();
            $table->string('og_title')->nullable();
            $table->text('og_description')->nullable();
            $table->string('og_image')->nullable();
            $table->string('og_type')->default('website');
            $table->string('twitter_card')->default('summary_large_image');
            $table->string('robots')->default('index,follow');
            $table->json('structured_data')->nullable();
            $table->json('keywords')->nullable();
            $table->timestamps();
            $table->unique(['seoable_type', 'seoable_id'], 'seo_unique');
            $table->index(['seoable_type', 'seoable_id']);
        });

        Schema::create('contact_submissions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->string('subject')->nullable();
            $table->string('department')->nullable(); // general, procurement, careers, media
            $table->text('message');
            $table->json('metadata')->nullable(); // ip, user_agent, url
            $table->string('status')->default('new'); // new, read, replied, archived, spam
            $table->text('internal_notes')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->index('status');
            $table->index('department');
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('question');
            $table->text('answer');
            $table->string('category')->default('general');
            $table->string('faqable_type')->nullable();
            $table->string('faqable_id')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['faqable_type', 'faqable_id']);
            $table->index('category');
        });

        Schema::create('esg_contents', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category'); // environment, social, governance, climate, water, biodiversity, energy, waste, community
            $table->text('summary')->nullable();
            $table->longText('content')->nullable();
            $table->string('featured_image')->nullable();
            $table->json('metrics')->nullable(); // key metrics
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('status')->default('published');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['category', 'is_active']);
        });

        Schema::create('hse_contents', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('safety'); // safety, health, environment, policy
            $table->text('summary')->nullable();
            $table->longText('content')->nullable();
            $table->string('featured_image')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('status')->default('published');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action'); // created, updated, deleted, published, login, etc
            $table->string('auditable_type')->nullable();
            $table->string('auditable_id')->nullable();
            $table->json('old_values')->nullable();
            $table->json('new_values')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('url')->nullable();
            $table->timestamps();
            $table->index(['auditable_type', 'auditable_id']);
            $table->index('user_id');
            $table->index('action');
        });

        Schema::create('revisions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('revisionable_type');
            $table->string('revisionable_id');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action')->default('update');
            $table->json('snapshot'); // full snapshot
            $table->json('changes')->nullable(); // diff
            $table->timestamps();
            $table->index(['revisionable_type', 'revisionable_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('revisions');
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('hse_contents');
        Schema::dropIfExists('esg_contents');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('contact_submissions');
        Schema::dropIfExists('seo_settings');
        Schema::dropIfExists('site_settings');
    }
};

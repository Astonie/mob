<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('careers', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('department')->nullable();
            $table->string('location')->nullable();
            $table->foreignUlid('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->string('employment_type')->default('full_time'); // full_time, part_time, contract, internship
            $table->string('experience_level')->nullable();
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->longText('requirements')->nullable();
            $table->longText('qualifications')->nullable();
            $table->longText('benefits')->nullable();
            $table->string('salary_range')->nullable();
            $table->date('deadline')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->string('status')->default('draft'); // draft, open, closed, archived
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('vacancies')->default(1);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'is_active']);
            $table->index('department');
        });

        Schema::create('career_applications', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('career_id')->constrained('careers')->cascadeOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->text('cover_letter')->nullable();
            $table->string('resume_path')->nullable();
            $table->string('resume_original_name')->nullable();
            $table->json('additional_documents')->nullable();
            $table->string('status')->default('pending'); // pending, reviewed, shortlisted, rejected, hired
            $table->text('internal_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->index(['career_id', 'status']);
            $table->index('email');
        });

        Schema::create('procurement_notices', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('reference_number')->unique()->nullable();
            $table->string('category')->nullable(); // tender, rfp, rfi, supplier_opportunity
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->longText('requirements')->nullable();
            $table->longText('submission_instructions')->nullable();
            $table->string('procurement_type')->nullable();
            $table->decimal('estimated_value', 15, 2)->nullable();
            $table->string('currency')->default('USD');
            $table->timestamp('published_at')->nullable();
            $table->timestamp('deadline')->nullable();
            $table->timestamp('closing_date')->nullable();
            $table->string('status')->default('draft'); // draft, published, closed, awarded, cancelled
            $table->boolean('is_featured')->default(false);
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->json('documents')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'deadline']);
            $table->index('category');
        });

        Schema::create('supplier_registrations', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('company_name');
            $table->string('trading_name')->nullable();
            $table->string('registration_number')->nullable();
            $table->string('tax_id')->nullable();
            $table->string('contact_person');
            $table->string('email');
            $table->string('phone');
            $table->string('alternative_phone')->nullable();
            $table->text('address');
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('website')->nullable();
            $table->string('business_type')->nullable();
            $table->json('categories')->nullable(); // array of service categories
            $table->text('description')->nullable();
            $table->json('certifications')->nullable();
            $table->json('documents')->nullable();
            $table->string('status')->default('pending'); // pending, approved, rejected, suspended
            $table->text('rejection_reason')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->index('status');
            $table->index('email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('supplier_registrations');
        Schema::dropIfExists('procurement_notices');
        Schema::dropIfExists('career_applications');
        Schema::dropIfExists('careers');
    }
};

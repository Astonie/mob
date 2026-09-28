<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('code')->nullable()->unique(); // e.g. KIB-001
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->foreignUlid('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->string('country')->nullable();
            $table->string('region')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('status')->default('exploration'); // exploration, development, operation, care, closed - configurable
            $table->string('stage')->nullable(); // exploration, feasibility, construction, production
            $table->string('project_type')->nullable(); // open_pit, underground, alluvial
            $table->string('ownership_percentage')->nullable();
            $table->string('ownership_structure')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('production_info')->nullable();
            $table->json('production_data')->nullable(); // {annual_output, reserves, resources}
            $table->json('esg_data')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('content_status')->default('draft'); // draft, review, approved, published, archived
            $table->timestamp('published_at')->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'is_active']);
            $table->index('content_status');
            $table->index('is_featured');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

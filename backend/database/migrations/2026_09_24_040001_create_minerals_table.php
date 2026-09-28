<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('minerals', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('chemical_symbol')->nullable();
            $table->string('category')->nullable(); // precious, base, battery, industrial
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();
            $table->longText('uses')->nullable();
            $table->json('properties')->nullable(); // hardness, density, etc
            $table->text('importance')->nullable();
            $table->string('color')->nullable();
            $table->string('featured_image')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('status')->default('published'); // draft, published
            $table->timestamp('published_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['is_active', 'is_featured']);
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('minerals');
    }
};

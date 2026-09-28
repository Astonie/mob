<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_assets', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('file_name');
            $table->string('original_name');
            $table->string('path'); // storage path
            $table->string('disk')->default('public'); // public, private, s3
            $table->string('mime_type');
            $table->string('extension', 20);
            $table->unsignedBigInteger('size'); // bytes
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->string('alt_text')->nullable();
            $table->string('caption')->nullable();
            $table->text('description')->nullable();
            $table->string('folder')->default('general'); // general, projects, minerals, news, documents
            $table->json('metadata')->nullable(); // exif, thumbnails, etc
            $table->string('mediable_type')->nullable(); // polymorphic
            $table->string('mediable_id')->nullable();
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['mediable_type', 'mediable_id']);
            $table->index('folder');
            $table->index('mime_type');
        });

        Schema::create('documents', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('category')->nullable(); // annual_report, financial, esg, governance, technical, procurement
            $table->string('type')->nullable(); // pdf, docx, xlsx
            $table->string('version')->default('1.0');
            $table->string('file_name');
            $table->string('original_name');
            $table->string('path');
            $table->string('disk')->default('private');
            $table->string('mime_type');
            $table->unsignedBigInteger('size');
            $table->date('publication_date')->nullable();
            $table->string('visibility')->default('public'); // public, private, restricted
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->string('documentable_type')->nullable();
            $table->string('documentable_id')->nullable();
            $table->integer('download_count')->default(0);
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['documentable_type', 'documentable_id']);
            $table->index(['category', 'visibility']);
            $table->index('is_featured');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
        Schema::dropIfExists('media_assets');
    }
};

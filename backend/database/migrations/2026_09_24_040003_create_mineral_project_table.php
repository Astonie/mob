<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mineral_project', function (Blueprint $table) {
            $table->foreignUlid('mineral_id')->constrained('minerals')->cascadeOnDelete();
            $table->foreignUlid('project_id')->constrained('projects')->cascadeOnDelete();
            $table->boolean('is_primary')->default(false);
            $table->integer('sort_order')->default(0);
            $table->primary(['mineral_id', 'project_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mineral_project');
    }
};

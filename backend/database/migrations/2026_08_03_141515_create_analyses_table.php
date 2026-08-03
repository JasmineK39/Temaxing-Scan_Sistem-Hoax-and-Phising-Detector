<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('analyses', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->enum('analysis_type', [
        'URL',
        'NEWS',
    ]);

    $table->enum('status', [
        'PENDING',
        'PROCESSING',
        'COMPLETED',
        'FAILED',
    ])->default('PENDING');

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analyses');
    }
};

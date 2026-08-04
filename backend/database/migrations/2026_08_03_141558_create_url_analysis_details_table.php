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
        Schema::create('url_analysis_details', function (Blueprint $table) {

    $table->id();

    $table->foreignId('analysis_id')
        ->constrained('analyses')
        ->cascadeOnDelete();

    $table->text('url');

    $table->text('normalized_url')->nullable();

    $table->string('domain')->nullable();

    $table->string('registered_domain')->nullable();

    $table->boolean('ssl_status')->nullable();

    $table->integer('domain_age')->nullable();

    $table->integer('risk_score')->default(0);

    $table->enum('risk_level', [
        'LOW',
        'MEDIUM',
        'HIGH',
        'CRITICAL',
    ])->nullable();

    $table->json('whois_result')->nullable();

    $table->json('virustotal_result')->nullable();

    $table->json('safe_browsing_result')->nullable();

    $table->json('urlscan_result')->nullable();

    $table->json('phishtank_result')->nullable();

    $table->string('ai_model')->nullable();

    $table->longText('ai_explanation')->nullable();

    $table->text('recommendation')->nullable();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('url_analysis_details');
    }
};

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Analysis\UrlAnalysisController;

Route::middleware('auth:sanctum')->group(function () {

    Route::post(
        '/analysis/url',
        [UrlAnalysisController::class, 'store']
    );

});
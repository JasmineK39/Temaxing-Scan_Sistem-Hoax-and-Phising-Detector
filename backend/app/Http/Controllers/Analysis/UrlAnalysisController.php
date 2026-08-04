<?php

namespace App\Http\Controllers\Analysis;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnalyzeUrlRequest;
use App\Services\Analysis\UrlAnalysisService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UrlAnalysisController extends Controller
{
    public function __construct(
        protected UrlAnalysisService $urlAnalysisService
    ) {}

    /**
     * Analyze URL.
     */
    public function store(
        AnalyzeUrlRequest $request
    ): JsonResponse
    {
        $result = $this->urlAnalysisService->analyze(
            Auth::user(),
            $request->validated()['url']
        );

        return response()->json([
        'success' => true,
        'data' => $result,
    ]);
    }
}
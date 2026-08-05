<?php

namespace App\Services\Analysis;

use App\Services\Analysis\DTO\AnalysisContext;
use App\Services\Analysis\DTO\AnalysisResult;
use App\Services\Analysis\Providers\WhoisService;
use App\Services\Analysis\Providers\SSLService;
use App\Services\Analysis\Providers\VirusTotalService;
use App\Services\Analysis\Providers\UrlScanService;
use App\Services\Analysis\Providers\PhishTankService;

class AnalysisService
{
    public function __construct(
        protected WhoisService $whoisService,
        protected SSLService $rdapService,
        protected VirusTotalService $virusTotalService,
        protected UrlScanService $urlScanService,
        protected PhishTankService $phishTankService,
    ) {
    }

    /**
     * Menjalankan seluruh provider analisis URL.
     */
    public function analyze(
        AnalysisContext $context
    ): AnalysisResult {

        return new AnalysisResult(
            providers: [

                'whois' => $this->whoisService->analyze(
                    $context->url
                ),

                'rdap' => $this->rdapService->analyze(
                    $context->url
                ),

                'virustotal' => $this->virusTotalService->analyze(
                    $context->url
                ),

                'urlscan' => $this->urlScanService->analyze(
                    $context->url
                ),

                'phishtank' => $this->phishTankService->analyze(
                    $context->url
                ),

            ],
        );

    }
}
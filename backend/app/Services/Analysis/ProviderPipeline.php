<?php

namespace App\Services\Analysis;

use App\DTO\UrlInformation;
use App\Services\Analysis\DTO\AnalysisResult;

class ProviderPipeline
{
    public function __construct(
        protected ProviderRegistry $registry,
    ) {
    }

    public function process(
        UrlInformation $urlInformation
    ): AnalysisResult {

        $results = [];

        foreach ($this->registry->all() as $key => $provider) {

            $results[$key] = $provider->analyze(
                $urlInformation
            );

        }

        return new AnalysisResult(
            providers: $results,
        );
    }
}
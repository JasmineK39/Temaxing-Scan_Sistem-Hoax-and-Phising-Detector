<?php

namespace App\Services\Analysis;

use App\Services\Analysis\DTO\AnalysisContext;
use App\Services\Analysis\DTO\AnalysisResult;

class ProviderPipeline
{
    public function __construct(
        protected ProviderRegistry $registry,
    ) {
    }

    public function process(
        AnalysisContext $context
    ): AnalysisResult {

        $results = [];

        foreach ($this->registry->all() as $provider) {

            $providerClass = class_basename($provider);

            $key = str_replace(
                'Service',
                '',
                $providerClass
            );

            $key = strtolower($key);

            $results[$key] = $provider->analyze(
                $context->url
            );

        }

        return new AnalysisResult(
            providers: $results,
        );

    }
}
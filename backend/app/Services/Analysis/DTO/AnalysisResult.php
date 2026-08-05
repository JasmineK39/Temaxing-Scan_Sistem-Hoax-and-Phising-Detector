<?php

namespace App\Services\Analysis\DTO;

class AnalysisResult
{
    /**
     * @param array<string, ProviderResult> $providers
     */
    public function __construct(
        public readonly array $providers,
    ) {
    }

    public function get(
        string $provider
    ): ?ProviderResult {

        return $this->providers[$provider] ?? null;

    }
}
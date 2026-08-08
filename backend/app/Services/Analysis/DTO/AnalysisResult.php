<?php

namespace App\Services\Analysis\DTO;

class AnalysisResult
{
    /**
     * @param ProviderResult[] $providers
     */
    public function __construct(
        public readonly array $providers,
    ) {
    }

    /**
     * Mengambil provider berdasarkan class.
     *
     * @template T of ProviderResult
     *
     * @param class-string<T> $class
     *
     * @return T|null
     */
    public function firstOf(
        string $class
    ): ?ProviderResult {

        foreach ($this->providers as $provider) {

            if ($provider instanceof $class) {
                return $provider;
            }

        }

        return null;

    }
}
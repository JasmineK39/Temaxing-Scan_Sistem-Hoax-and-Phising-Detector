<?php

namespace App\Services\Analysis;

use App\Services\Analysis\Contracts\UrlProviderInterface;

class ProviderRegistry
{
    /**
     * @param iterable<UrlProviderInterface> $providers
     */
    public function __construct(
        protected iterable $providers,
    ) {
    }

    /**
     * Mengembalikan seluruh provider yang aktif.
     *
     * @return iterable<UrlProviderInterface>
     */
    public function all(): iterable
    {
        return $this->providers;
    }
}
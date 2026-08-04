<?php

namespace App\Services\Analysis\Contracts;

use App\DTO\UrlInformation;
use App\Services\Analysis\DTO\ProviderResult;

/**
 * @template T of ProviderResult
 */
interface UrlProviderInterface
{
    /**
     * @return T
     */
    public function analyze(
        UrlInformation $urlInformation
    ): ProviderResult;
}
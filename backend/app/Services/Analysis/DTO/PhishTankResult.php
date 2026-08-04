<?php

namespace App\Services\Analysis\DTO;

class PhishTankResult extends ProviderResult
{
    public function __construct(
        bool $success,

        public readonly bool $found = false,

        public readonly ?string $phishId = null,

        public readonly array $rawData = [],

        ?string $error = null,

        ?int $responseTime = null,
    ) {
        parent::__construct(
            provider: 'PhishTank',
            success: $success,
            error: $error,
            responseTime: $responseTime,
        );
    }
}
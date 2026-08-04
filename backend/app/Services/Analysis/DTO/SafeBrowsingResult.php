<?php

namespace App\Services\Analysis\DTO;

class SafeBrowsingResult extends ProviderResult
{
    public function __construct(
        bool $success,

        public readonly bool $isUnsafe = false,

        public readonly array $threats = [],

        public readonly array $rawData = [],

        ?string $error = null,

        ?int $responseTime = null,
    ) {
        parent::__construct(
            provider: 'Google Safe Browsing',
            success: $success,
            error: $error,
            responseTime: $responseTime,
        );
    }
}
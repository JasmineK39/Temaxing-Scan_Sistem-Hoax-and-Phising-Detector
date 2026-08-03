<?php

namespace App\Services\Analysis\DTO;

class SSLResult extends ProviderResult
{
    public function __construct(
        bool $success,
        public readonly bool $sslStatus,
        public readonly ?string $issuer = null,
        public readonly ?string $validFrom = null,
        public readonly ?string $validTo = null,
        ?string $error = null,
        ?int $responseTime = null,
    ) {
        parent::__construct(
            provider: 'SSL',
            success: $success,
            error: $error,
            responseTime: $responseTime,
        );
    }
}
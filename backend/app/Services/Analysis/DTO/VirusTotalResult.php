<?php

namespace App\Services\Analysis\DTO;

class VirusTotalResult extends ProviderResult
{
    public function __construct(
        bool $success,

        public readonly int $malicious = 0,

        public readonly int $suspicious = 0,

        public readonly int $harmless = 0,

        public readonly int $undetected = 0,

        public readonly array $rawData = [],

        ?string $error = null,

        ?int $responseTime = null,
    ) {
        parent::__construct(
            provider: 'VirusTotal',
            success: $success,
            error: $error,
            responseTime: $responseTime,
        );
    }
}
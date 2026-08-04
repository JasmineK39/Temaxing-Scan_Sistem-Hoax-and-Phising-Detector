<?php

namespace App\Services\Analysis\DTO;

class UrlScanResult extends ProviderResult
{
    public function __construct(
        bool $success,

        public readonly ?string $scanId = null,

        public readonly ?string $verdict = null,

        public readonly array $rawData = [],

        ?string $error = null,

        ?int $responseTime = null,
    ) {
        parent::__construct(
            provider: 'URLScan',
            success: $success,
            error: $error,
            responseTime: $responseTime,
        );
    }
}
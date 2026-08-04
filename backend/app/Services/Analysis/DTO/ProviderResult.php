<?php

namespace App\Services\Analysis\DTO;

abstract class ProviderResult
{
    public function __construct(
        public readonly string $provider,
        public readonly bool $success,
        public readonly ?string $error = null,
        public readonly ?int $responseTime = null,
    ) {
    }
}
<?php

namespace App\Services\Analysis\DTO;

class WhoisResult extends ProviderResult
{
    public function __construct(
        bool $success,

        public readonly ?string $registrar = null,

        public readonly ?string $creationDate = null,

        public readonly ?string $expirationDate = null,

        public readonly ?string $updatedDate = null,

        public readonly ?int $domainAge = null,

        /*
        |--------------------------------------------------------------------------
        | Production-ready fields
        |--------------------------------------------------------------------------
        */

        public readonly bool $isRecentlyRegistered = false,

        public readonly ?int $daysUntilExpiration = null,

        public readonly array $statuses = [],

        public readonly array $nameServers = [],

        /*
        |--------------------------------------------------------------------------
        | Debug
        |--------------------------------------------------------------------------
        */

        public readonly array $rawData = [],

        ?string $error = null,

        ?int $responseTime = null,
    ) {
        parent::__construct(
            provider: 'WHOIS',
            success: $success,
            error: $error,
            responseTime: $responseTime,
        );
    }
}
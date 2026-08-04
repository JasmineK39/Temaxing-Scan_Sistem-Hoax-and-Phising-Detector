<?php

namespace App\Services\Analysis\DTO;

class GoogleSafeBrowsingResult extends ProviderResult
{
    public function __construct(

        bool $success,

        /**
         * Apakah URL dianggap berbahaya.
         */
        public readonly bool $unsafe = false,

        /**
         * Semua threat yang ditemukan.
         *
         * Contoh:
         * MALWARE
         * SOCIAL_ENGINEERING
         * UNWANTED_SOFTWARE
         */
        public readonly array $threats = [],

        /**
         * Raw response (debug only).
         */
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
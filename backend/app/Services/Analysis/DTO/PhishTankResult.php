<?php

namespace App\Services\Analysis\DTO;

class PhishTankResult extends ProviderResult
{
    public function __construct(

        bool $success,

        /**
         * URL ditemukan di database PhishTank.
         */
        public readonly bool $found = false,

        /**
         * Laporan sudah diverifikasi oleh PhishTank.
         */
        public readonly bool $verified = false,

        /**
         * Status phishing masih valid.
         */
        public readonly bool $valid = false,

        /**
         * ID phishing di PhishTank.
         */
        public readonly ?int $phishId = null,

        /**
         * Halaman detail laporan.
         */
        public readonly ?string $detailUrl = null,

        /**
         * Target phishing.
         * Contoh:
         * - PayPal
         * - Google
         * - Microsoft
         */
        public readonly ?string $target = null,

        /**
         * Waktu URL pertama kali dilaporkan.
         */
        public readonly ?string $submittedAt = null,

        /**
         * Waktu laporan diverifikasi.
         */
        public readonly ?string $verifiedAt = null,

        /**
         * Disimpan hanya ketika APP_DEBUG=true.
         */
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
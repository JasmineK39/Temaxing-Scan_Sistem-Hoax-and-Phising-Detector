<?php

namespace App\Services\Analysis\DTO;

class UrlScanResult extends ProviderResult
{
    public function __construct(

        bool $success,

        /**
         * Overall verdict dari URLScan.
         *
         * Contoh:
         * - malicious
         * - suspicious
         * - clean
         */
        public readonly bool $malicious = false,

        /**
         * Risk score dari URLScan.
         */
        public readonly ?int $score = null,

        /**
         * Judul halaman.
         */
        public readonly ?string $pageTitle = null,

        /**
         * URL final setelah redirect.
         */
        public readonly ?string $finalUrl = null,

        /**
         * Alamat IP tujuan.
         */
        public readonly ?string $ip = null,

        /**
         * ASN.
         */
        public readonly ?string $asn = null,

        /**
         * Negara server.
         */
        public readonly ?string $country = null,

        /**
         * Web server.
         *
         * Contoh:
         * nginx
         * cloudflare
         */
        public readonly ?string $server = null,

        /**
         * Teknologi yang terdeteksi.
         *
         * @var string[]
         */
        public readonly array $technologies = [],

        /**
         * Redirect chain.
         *
         * @var string[]
         */
        public readonly array $redirectChain = [],

        /**
         * Screenshot URLScan.
         */
        public readonly ?string $screenshot = null,

        /**
         * Raw data (debug only).
         */
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
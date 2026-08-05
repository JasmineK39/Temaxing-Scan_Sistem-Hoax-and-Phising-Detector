<?php

namespace App\Services\Analysis\Infrastructure\UrlScan;

use App\DTO\UrlInformation;

class UrlScanRequestBuilder
{
    /**
     * Membangun request body untuk URLScan.
     */
    public function build(
        UrlInformation $urlInformation
    ): array {

        return [

            'url' => $urlInformation->normalizedUrl,

            'visibility' => config(
        'services.urlscan.visibility'
    ),

        ];

    }
}
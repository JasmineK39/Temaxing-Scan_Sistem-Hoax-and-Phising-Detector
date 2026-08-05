<?php

namespace App\Services\Analysis\Infrastructure\PhishTank;

use App\DTO\UrlInformation;

class PhishTankRequestBuilder
{
    /**
     * Membangun request body untuk PhishTank.
     */
    public function build(
        UrlInformation $urlInformation
    ): array {

        $payload = [

            'url' => $urlInformation->normalizedUrl,

            'format' => 'json',

        ];

        $appKey = config(
            'services.phishtank.app_key'
        );

        if (! empty($appKey)) {

            $payload['app_key'] = $appKey;

        }

        return $payload;

    }
}
<?php

namespace App\Services\Analysis\Infrastructure\GoogleSafeBrowsing;

use App\DTO\UrlInformation;

class GoogleSafeBrowsingRequestBuilder
{
    /**
     * Membangun request body sesuai spesifikasi Google Safe Browsing API.
     */
    public function build(
        UrlInformation $urlInformation
    ): array {

        return [

            'client' => [

                'clientId' => config(
                    'app.name',
                    'Temaxing Scan'
                ),

                'clientVersion' => '1.0.0',

            ],

            'threatInfo' => [

                'threatTypes' => [

                    'MALWARE',

                    'SOCIAL_ENGINEERING',

                    'UNWANTED_SOFTWARE',

                    'POTENTIALLY_HARMFUL_APPLICATION',

                ],

                'platformTypes' => [

                    'ANY_PLATFORM',

                ],

                'threatEntryTypes' => [

                    'URL',

                ],

                'threatEntries' => [

                    [

                        'url' => $urlInformation->normalizedUrl,

                    ],

                ],

            ],

        ];

    }
}
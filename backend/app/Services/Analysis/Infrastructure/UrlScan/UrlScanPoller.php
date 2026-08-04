<?php

namespace App\Services\Analysis\Infrastructure\UrlScan;

use App\Services\Analysis\Exceptions\UrlScanException;
use App\Services\Analysis\Infrastructure\Http\ApiClient;
use Illuminate\Http\Client\Response;

class UrlScanPoller
{

    public function __construct(
        protected ApiClient $apiClient,
    ) {
    }

    /**
     * Menunggu hingga URLScan selesai melakukan analisis.
     */
    public function wait(
        string $uuid
    ): Response {

        $attempt = 0;

        while ($attempt < ('services.urlscan.max_attempts')) {

            sleep(
                config('services.urlscan.poll_interval')
            );

            $response = $this->fetchResult(
                $uuid
            );

            /**
             * URLScan mengembalikan 404 selama scan
             * masih diproses.
             */
            if ($response->status() === 404) {

                $attempt++;

                continue;

            }

            if (! $response->successful()) {

                throw new UrlScanException(

                    sprintf(
                        'URLScan returned HTTP %d.',
                        $response->status()
                    )

                );

            }

            return $response;

        }

        throw new UrlScanException(
            'URLScan analysis timed out.'
        );

    }

    /**
     * Mengambil hasil scan berdasarkan UUID.
     */
    protected function fetchResult(
        string $uuid
    ): Response {

        return $this->apiClient->get(

            url: sprintf(
                '%s/%s',
                rtrim(
                    config(
                        'services.urlscan.result_url'
                    ),
                    '/'
                ),
                $uuid
            ),

            headers: [

                'API-Key' => config(
                    'services.urlscan.api_key'
                ),

            ],

            timeout: config(
    'services.urlscan.timeout'
),

        );

    }
}
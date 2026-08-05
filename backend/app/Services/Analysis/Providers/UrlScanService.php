<?php

namespace App\Services\Analysis\Providers;

use App\DTO\UrlInformation;
use App\Services\Analysis\Contracts\UrlProviderInterface;
use App\Services\Analysis\DTO\UrlScanResult;
use App\Services\Analysis\Exceptions\UrlScanException;
use App\Services\Analysis\Infrastructure\Http\ApiClient;
use App\Services\Analysis\Infrastructure\UrlScan\UrlScanPoller;
use App\Services\Analysis\Infrastructure\UrlScan\UrlScanRequestBuilder;
use App\Services\Analysis\Mappers\UrlScanResponseMapper;
use Throwable;

class UrlScanService implements UrlProviderInterface
{
    public function __construct(
        protected ApiClient $apiClient,
        protected UrlScanRequestBuilder $requestBuilder,
        protected UrlScanPoller $poller,
        protected UrlScanResponseMapper $mapper,
    ) {
    }

    public function analyze(
        UrlInformation $urlInformation
    ): UrlScanResult {

        $start = microtime(true);

        try {

            $uuid = $this->submitScan(
                $urlInformation
            );

            $response = $this->poller->wait(
    $uuid
);

return $this->mapper->map(
    json: $response->json(),
    responseTime: $this->elapsed($start),
);

        } catch (Throwable $e) {

            return new UrlScanResult(

                success: false,

                error: '[URLScan] '.$e->getMessage(),

                responseTime: $this->elapsed($start),

            );

        }

    }

    /**
     * Submit URL ke URLScan.
     */
    protected function submitScan(
        UrlInformation $urlInformation
    ): string {

        $response = $this->apiClient->post(

            url: config('services.urlscan.submit_url'),

            body: $this->requestBuilder->build(
                $urlInformation
            ),

            headers: [

                'API-Key' => config(
                    'services.urlscan.api_key'
                ),

            ],

        );

        if (! $response->successful()) {

            throw new UrlScanException(

                sprintf(
                    'URLScan submit failed with HTTP %d.',
                    $response->status()
                )

            );

        }

        return (string) data_get(
            $response->json(),
            'uuid'
        );

    }

    protected function elapsed(
        float $start
    ): int {

        return (int) round(
            (microtime(true) - $start) * 1000
        );

    }
}
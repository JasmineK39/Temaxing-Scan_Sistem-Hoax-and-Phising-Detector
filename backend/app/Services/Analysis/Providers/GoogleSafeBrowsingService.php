<?php

namespace App\Services\Analysis\Providers;

use App\DTO\UrlInformation;
use App\Services\Analysis\Contracts\UrlProviderInterface;
use App\Services\Analysis\DTO\GoogleSafeBrowsingResult;
use App\Services\Analysis\Infrastructure\GoogleSafeBrowsing\GoogleSafeBrowsingRequestBuilder;
use App\Services\Analysis\Infrastructure\Http\ApiClient;
use App\Services\Analysis\Mappers\GoogleSafeBrowsingResponseMapper;
use Throwable;

/**
 * @implements UrlProviderInterface<GoogleSafeBrowsingResult>
 */
class GoogleSafeBrowsingService implements UrlProviderInterface
{
    public function __construct(
        protected ApiClient $apiClient,
        protected GoogleSafeBrowsingRequestBuilder $requestBuilder,
        protected GoogleSafeBrowsingResponseMapper $mapper,
    ) {
    }

    public function analyze(
        UrlInformation $urlInformation
    ): GoogleSafeBrowsingResult {

        $start = microtime(true);

        try {

            $response = $this->apiClient->post(

                url: sprintf(
                    '%s?key=%s',
                    config('services.google_safe_browsing.endpoint'),
                    config('services.google_safe_browsing.api_key'),
                ),

                body: $this->requestBuilder->build(
                    $urlInformation
                ),

            );

            if (! $response->successful()) {

                return new GoogleSafeBrowsingResult(

                    success: false,

                    error: sprintf(
                        'Google Safe Browsing returned HTTP %d.',
                        $response->status()
                    ),

                    responseTime: $this->elapsed($start),

                );

            }

            return $this->mapper->map(

                json: $response->json(),

                responseTime: $this->elapsed($start),

            );

        } catch (Throwable $e) {

            return new GoogleSafeBrowsingResult(

                success: false,

                error: $e->getMessage(),

                responseTime: $this->elapsed($start),

            );

        }

    }

    protected function elapsed(
        float $start
    ): int {

        return (int) round(
            (microtime(true) - $start) * 1000
        );

    }
}
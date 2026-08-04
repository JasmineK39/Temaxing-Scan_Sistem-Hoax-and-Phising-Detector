<?php

namespace App\Services\Analysis\Providers;

use App\DTO\UrlInformation;
use App\Services\Analysis\Contracts\UrlProviderInterface;
use App\Services\Analysis\DTO\PhishTankResult;
use App\Services\Analysis\Exceptions\PhishTankException;
use App\Services\Analysis\Infrastructure\Http\ApiClient;
use App\Services\Analysis\Infrastructure\PhishTank\PhishTankRequestBuilder;
use App\Services\Analysis\Mappers\PhishTankResponseMapper;
use Throwable;

class PhishTankService implements UrlProviderInterface
{
    public function __construct(
        protected ApiClient $apiClient,
        protected PhishTankRequestBuilder $requestBuilder,
        protected PhishTankResponseMapper $mapper,
    ) {
    }

    public function analyze(
        UrlInformation $urlInformation
    ): PhishTankResult {

        $start = microtime(true);

        try {

            $response = $this->apiClient->postForm(

                url: config(
                    'services.phishtank.base_url'
                ),

                body: $this->requestBuilder->build(
                    $urlInformation
                ),

                headers: [

                    'User-Agent' => config(
                        'services.phishtank.user_agent'
                    ),

                ],

                timeout: 30,

            );

            if (! $response->successful()) {

                throw new PhishTankException(

                    sprintf(
                        'PhishTank returned HTTP %d.',
                        $response->status()
                    )

                );

            }

            return $this->mapper->map(

                json: $response->json(),

                responseTime: $this->elapsed(
                    $start
                ),

            );

        } catch (Throwable $e) {

            return new PhishTankResult(

                success: false,

                error: '[PhishTank] ' . $e->getMessage(),

                responseTime: $this->elapsed(
                    $start
                ),

            );

        }

    }

    /**
     * Menghitung response time.
     */
    protected function elapsed(
        float $start
    ): int {

        return (int) round(
            (microtime(true) - $start) * 1000
        );

    }
}
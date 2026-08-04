<?php

namespace App\Services\Analysis\Providers;

use App\DTO\UrlInformation;
use App\Services\Analysis\Contracts\UrlProviderInterface;
use App\Services\Analysis\DTO\WhoisResult;
use App\Services\Analysis\Infrastructure\Http\ApiClient;
use App\Services\Analysis\Infrastructure\Rdap\RdapEndpointResolver;
use App\Services\Analysis\Mappers\RdapResponseMapper;
use Throwable;

/**
 * @implements UrlProviderInterface<WhoisResult>
 */
class WhoisService implements UrlProviderInterface
{
    public function __construct(
        protected ApiClient $apiClient,
        protected RdapEndpointResolver $resolver,
        protected RdapResponseMapper $mapper,
    ) {
    }

    public function analyze(
        UrlInformation $urlInformation
    ): WhoisResult {

        $start = microtime(true);

        try {

        if ($urlInformation->registeredDomain === null) {
    return new WhoisResult(
        success: false,
        error: 'Registered domain could not be determined.',
        responseTime: $this->elapsed($start),
    );
}

            $endpoint = $this->resolver->resolve(
                $urlInformation->registeredDomain
            );

            $response = $this->apiClient->get(
                url: $endpoint
            );

            if (! $response->successful()) {

                return new WhoisResult(
                    success: false,
                    error: sprintf(
                        'RDAP request failed with HTTP %d.',
                        $response->status()
                    ),
                    responseTime: $this->elapsed($start),
                );

            }

            return $this->mapper->map(
    $response->json(),
    $this->elapsed($start),
);

        } catch (Throwable $e) {

            return new WhoisResult(
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
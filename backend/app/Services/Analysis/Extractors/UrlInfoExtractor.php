<?php

namespace App\Services\Analysis\Extractors;

use App\DTO\UrlInformation;

class UrlInfoExtractor
{
    /**
     * Second-level TLD yang kita dukung.
     */
    protected array $secondLevelTlds = [
        'co.id',
        'ac.id',
        'go.id',
        'or.id',
        'sch.id',
        'net.id',
        'web.id',
    ];

    public function extract(
        string $originalUrl,
        string $normalizedUrl
    ): UrlInformation {

        $parts = parse_url($normalizedUrl);

        $host = strtolower($parts['host'] ?? '');

        return new UrlInformation(

            originalUrl: $originalUrl,

            normalizedUrl: $normalizedUrl,

            scheme: $parts['scheme'] ?? 'https',

            host: $host,

            registeredDomain: $this->extractRegisteredDomain($host),

            subdomain: $this->extractSubdomain($host),

            port: $parts['port'] ?? null,

            path: $parts['path'] ?? null,

            query: $parts['query'] ?? null,

            fragment: $parts['fragment'] ?? null,
        );
    }

    protected function extractRegisteredDomain(
        string $host
    ): ?string {

        if ($host === '') {
            return null;
        }

        $segments = explode('.', $host);

        if (count($segments) < 2) {
            return $host;
        }

        $lastTwo = implode('.', array_slice($segments, -2));

        if (
            in_array($lastTwo, $this->secondLevelTlds, true)
            && count($segments) >= 3
        ) {
            return implode('.', array_slice($segments, -3));
        }

        return implode('.', array_slice($segments, -2));
    }

    protected function extractSubdomain(
        string $host
    ): ?string {

        $registeredDomain = $this->extractRegisteredDomain($host);

        if (
            $registeredDomain === null ||
            $host === $registeredDomain
        ) {
            return null;
        }

        return rtrim(
            substr(
                $host,
                0,
                -strlen($registeredDomain)
            ),
            '.'
        );
    }
}
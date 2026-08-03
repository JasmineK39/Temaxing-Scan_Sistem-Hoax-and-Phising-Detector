<?php

namespace App\Services\Analysis\Extractors;

use App\DTO\UrlInformation;

class UrlInfoExtractor
{
    public function extract(
        string $originalUrl,
        string $normalizedUrl
    ): UrlInformation {

        $parts = parse_url($normalizedUrl);

        $host = $parts['host'] ?? '';

        return new UrlInformation(

            originalUrl: $originalUrl,

            normalizedUrl: $normalizedUrl,

            scheme: $parts['scheme'] ?? 'https',

            host: strtolower($host),

            registeredDomain: $this->extractRegisteredDomain($host),

            path: $parts['path'] ?? null,

            query: $parts['query'] ?? null,
        );
    }

    protected function extractRegisteredDomain(
        string $host
    ): ?string {

        $segments = explode('.', $host);

        if (count($segments) < 2) {
            return null;
        }

        return implode('.', array_slice($segments, -2));
    }
}
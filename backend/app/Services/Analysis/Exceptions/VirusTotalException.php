<?php

namespace App\Services\Analysis\Exceptions;

class VirusTotalException extends ProviderException
{
    public function __construct(
        string $message,
        ?int $statusCode = null,
        ?array $response = null,
    ) {

        parent::__construct(
            provider: 'VirusTotal',
            message: $message,
            statusCode: $statusCode,
            response: $response,
        );

    }
}
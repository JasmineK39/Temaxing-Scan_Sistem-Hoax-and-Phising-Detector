<?php

namespace App\Services\Analysis\Exceptions;

use Exception;

class ProviderException extends Exception
{
    public function __construct(
        string $provider,
        string $message,
        protected ?int $statusCode = null,
        protected ?array $response = null,
    ) {

        parent::__construct(
            sprintf('[%s] %s', $provider, $message)
        );

    }

    public function statusCode(): ?int
    {
        return $this->statusCode;
    }

    public function response(): ?array
    {
        return $this->response;
    }
}
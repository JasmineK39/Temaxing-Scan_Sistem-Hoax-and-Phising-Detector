<?php

namespace App\Services\Analysis\Infrastructure\Http;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class ApiClient
{
    /**
     * Membuat instance HTTP client dengan konfigurasi standar.
     */
    protected function client(
        int $timeout = 15
    ): PendingRequest {
        return Http::acceptJson()
            ->timeout($timeout)
            ->retry(
                times: 2,
                sleepMilliseconds: 500,
                throw: false
            );
    }

    /**
     * HTTP GET.
     */
    public function get(
        string $url,
        array $query = [],
        array $headers = [],
        int $timeout = 15
    ): Response {

        return $this->client($timeout)
            ->withHeaders($headers)
            ->get($url, $query);
    }

    /**
     * HTTP POST.
     */
    public function post(
        string $url,
        array $body = [],
        array $headers = [],
        int $timeout = 15
    ): Response {

        return $this->client($timeout)
            ->withHeaders($headers)
            ->post($url, $body);
    }

    /**
     * HTTP POST Form.
     */
    public function postForm(
        string $url,
        array $body = [],
        array $headers = [],
        int $timeout = 15
    ): Response {

        return $this->client($timeout)
            ->withHeaders($headers)
            ->asForm()
            ->post($url, $body);
    }
}
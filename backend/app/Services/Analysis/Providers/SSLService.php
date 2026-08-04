<?php

namespace App\Services\Analysis\Providers;

use App\DTO\UrlInformation;
use App\Services\Analysis\Contracts\UrlProviderInterface;
use App\Services\Analysis\DTO\SSLResult;

/**
 * @implements UrlProviderInterface<SSLResult>
 */
class SSLService implements UrlProviderInterface
{
    public function analyze(
        UrlInformation $urlInformation
    ): SSLResult {

        $start = microtime(true);

        try {

            $certificate = $this->fetchCertificate(
                $urlInformation->host
            );

            if ($certificate === null) {

                return new SSLResult(
                    success: false,
                    sslStatus: false,
                    error: 'SSL certificate not found.',
                    responseTime: $this->elapsed($start),
                );
            }

            return new SSLResult(
                success: true,
                sslStatus: true,
                issuer: $certificate['issuer'] ?? null,
                validFrom: $certificate['validFrom'] ?? null,
                validTo: $certificate['validTo'] ?? null,
                responseTime: $this->elapsed($start),
            );

        } catch (\Throwable $e) {

            return new SSLResult(
                success: false,
                sslStatus: false,
                error: $e->getMessage(),
                responseTime: $this->elapsed($start),
            );
        }
    }

    /**
     * Ambil informasi sertifikat SSL.
     */
    protected function fetchCertificate(
        string $host
    ): ?array {

        $context = stream_context_create([
            'ssl' => [
                'capture_peer_cert' => true,
            ],
        ]);

        $client = @stream_socket_client(
            "ssl://{$host}:443",
            $errno,
            $errstr,
            10,
            STREAM_CLIENT_CONNECT,
            $context
        );

        if (! $client) {
            return null;
        }

        $params = stream_context_get_params($client);

        if (! isset($params['options']['ssl']['peer_certificate'])) {
            return null;
        }

        $certificate = openssl_x509_parse(
            $params['options']['ssl']['peer_certificate']
        );

        return [

            'issuer' => $certificate['issuer']['CN'] ?? null,

            'validFrom' => isset($certificate['validFrom_time_t'])
                ? date('Y-m-d H:i:s', $certificate['validFrom_time_t'])
                : null,

            'validTo' => isset($certificate['validTo_time_t'])
                ? date('Y-m-d H:i:s', $certificate['validTo_time_t'])
                : null,
        ];
    }

    protected function elapsed(
        float $start
    ): int {

        return (int) round(
            (microtime(true) - $start) * 1000
        );
    }
}
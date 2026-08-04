<?php

namespace App\Services\Analysis\Providers;

use App\DTO\UrlInformation;
use App\Services\Analysis\Contracts\UrlProviderInterface;
use App\Services\Analysis\DTO\VirusTotalResult;
use App\Services\Analysis\Exceptions\VirusTotalException;
use App\Services\Analysis\Infrastructure\Http\ApiClient;
use App\Services\Analysis\Infrastructure\VirusTotal\VirusTotalUrlEncoder;
use App\Services\Analysis\Mappers\VirusTotalResponseMapper;
use Illuminate\Http\Client\Response;
use Throwable;

class VirusTotalService implements UrlProviderInterface
{
    protected const MAX_POLL_ATTEMPTS = 20;

    protected const POLL_INTERVAL_SECONDS = 2;

    public function __construct(
        protected ApiClient $apiClient,
        protected VirusTotalUrlEncoder $urlEncoder,
        protected VirusTotalResponseMapper $mapper,
    ) {
    }

    public function analyze(
        UrlInformation $urlInformation
    ): VirusTotalResult {

        $start = microtime(true);

        try {

            $analysisId = $this->submitUrl(
                $urlInformation
            );

            $this->waitForCompletion(
                $analysisId
            );

            $urlId = $this->urlEncoder->encode(
                $urlInformation->normalizedUrl
            );

            $report = $this->fetchUrlReport(
                $urlId
            );

            if (! $report->successful()) {

                throw new VirusTotalException(
                    sprintf(
                        'VirusTotal URL report failed with HTTP %d.',
                        $report->status()
                    )
                );

            }

            return $this->mapper->map(
                json: $report->json(),
                responseTime: $this->elapsed($start),
            );

        } catch (Throwable $e) {

            return new VirusTotalResult(
                success: false,
                error: '[VirusTotal] '.$e->getMessage(),
                responseTime: $this->elapsed($start),
            );

        }

    }

    /**
     * Submit URL ke VirusTotal.
     */
    protected function submitUrl(
        UrlInformation $urlInformation
    ): string {

        $response = $this->apiClient->postForm(

            url: config('services.virustotal.submit_url'),

            body: [
                'url' => $urlInformation->normalizedUrl,
            ],

            headers: [
                'x-apikey' => config('services.virustotal.api_key'),
            ],

        );

        if (! $response->successful()) {

            throw new VirusTotalException(
                sprintf(
                    'VirusTotal submit failed with HTTP %d.',
                    $response->status()
                )
            );

        }

        return (string) data_get(
            $response->json(),
            'data.id'
        );

    }

    /**
     * Menunggu hingga analisis selesai.
     */
    protected function waitForCompletion(
        string $analysisId
    ): void {

        $attempt = 0;

        while ($attempt < self::MAX_POLL_ATTEMPTS) {

            sleep(
                self::POLL_INTERVAL_SECONDS
            );

            $response = $this->fetchAnalysis(
                $analysisId
            );

            if (! $response->successful()) {

                throw new VirusTotalException(
                    sprintf(
                        'VirusTotal returned HTTP %d.',
                        $response->status()
                    )
                );

            }

            $status = data_get(
                $response->json(),
                'data.attributes.status'
            );

            if ($status === 'completed') {
                return;
            }

            $attempt++;

        }

        throw new VirusTotalException(
            'VirusTotal analysis timed out.'
        );

    }

    /**
     * Mengambil status analisis.
     */
    protected function fetchAnalysis(
        string $analysisId
    ): Response {

        return $this->apiClient->get(

            url: sprintf(
                '%s/%s',
                config('services.virustotal.analysis_url'),
                $analysisId
            ),

            headers: [
                'x-apikey' => config('services.virustotal.api_key'),
            ],

        );

    }

    /**
     * Mengambil laporan URL final.
     */
    protected function fetchUrlReport(
        string $urlId
    ): Response {

        return $this->apiClient->get(

            url: sprintf(
                '%s/%s',
                config('services.virustotal.url_report_url'),
                $urlId
            ),

            headers: [
                'x-apikey' => config('services.virustotal.api_key'),
            ],

        );

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
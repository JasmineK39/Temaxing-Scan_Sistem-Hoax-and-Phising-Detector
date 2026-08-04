<?php

namespace App\Console\Commands;

use App\Services\Analysis\Extractors\UrlInfoExtractor;
use App\Services\Analysis\Normalizers\UrlNormalizer;
use App\Services\Analysis\Providers\VirusTotalService;
use Illuminate\Console\Command;

class TestVirusTotalProvider extends Command
{
    protected $signature = 'analysis:test-vt {url}';

    protected $description = 'Test VirusTotal Provider';

    public function handle(
        UrlNormalizer $normalizer,
        UrlInfoExtractor $extractor,
        VirusTotalService $service
    ): int {

        $url = $this->argument('url');

        $normalized = $normalizer->normalize(
            $url
        );

        $urlInformation = $extractor->extract(
            originalUrl: $url,
            normalizedUrl: $normalized,
        );

        $result = $service->analyze(
            $urlInformation
        );

        dump([
    'success' => $result->success,
    'malicious' => $result->malicious,
    'suspicious' => $result->suspicious,
    'harmless' => $result->harmless,
    'undetected' => $result->undetected,
    'timeout' => $result->timeout,
    'failure' => $result->failure,
    'confirmedTimeout' => $result->confirmedTimeout,
    'typeUnsupported' => $result->typeUnsupported,
    'reputation' => $result->reputation,
    'detections' => count($result->detections),
]);

        return self::SUCCESS;
    }
}
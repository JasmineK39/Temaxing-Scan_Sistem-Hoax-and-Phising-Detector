<?php

namespace App\Console\Commands;

use App\Services\Analysis\Extractors\UrlInfoExtractor;
use App\Services\Analysis\Normalizers\UrlNormalizer;
use App\Services\Analysis\Providers\UrlScanService;
use Illuminate\Console\Command;

class TestUrlScanProvider extends Command
{
    protected $signature = 'analysis:test-urlscan {url}';

    protected $description = 'Test URLScan Provider';

    public function handle(
        UrlNormalizer $normalizer,
        UrlInfoExtractor $extractor,
        UrlScanService $service
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

    'score' => $result->score,

    'pageTitle' => $result->pageTitle,

    'finalUrl' => $result->finalUrl,

    'technologies' => count($result->technologies),

]);

        return self::SUCCESS;
    }
}
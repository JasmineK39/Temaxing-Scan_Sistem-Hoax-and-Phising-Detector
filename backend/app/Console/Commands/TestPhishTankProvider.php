<?php

namespace App\Console\Commands;

use App\Services\Analysis\Extractors\UrlInfoExtractor;
use App\Services\Analysis\Normalizers\UrlNormalizer;
use App\Services\Analysis\Providers\PhishTankService;
use Illuminate\Console\Command;

class TestPhishTankProvider extends Command
{
    protected $signature = 'analysis:test-phishtank {url}';

    protected $description = 'Test PhishTank Provider';

    public function handle(
        UrlNormalizer $normalizer,
        UrlInfoExtractor $extractor,
        PhishTankService $service
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

        dump($result);

        return self::SUCCESS;

    }
}
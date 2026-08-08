<?php

namespace App\Console\Commands;

use App\Services\Analysis\AnalysisService;
use App\Services\Analysis\Extractors\UrlInfoExtractor;
use App\Services\Analysis\Normalizers\UrlNormalizer;
use Illuminate\Console\Command;
use Throwable;

class TestAnalysisCommand extends Command
{
    protected $signature = 'analysis:test
                            {url : URL yang ingin dianalisis}';

    protected $description = 'Menjalankan seluruh pipeline analisis URL secara end-to-end';

    public function __construct(
        protected UrlNormalizer $normalizer,
        protected UrlInfoExtractor $extractor,
        protected AnalysisService $analysisService,
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        $originalUrl = $this->argument('url');

        $this->newLine();

        $this->info('========================================');
        $this->info('       URL ANALYSIS - END TO END       ');
        $this->info('========================================');

        $this->newLine();

        try {

            /*
             * 1. Normalize URL
             */
            $normalizedUrl = $this->normalizer->normalize(
                $originalUrl
            );

            if ($normalizedUrl === '') {

                $this->error(
                    'URL tidak valid setelah proses normalisasi.'
                );

                return self::FAILURE;
            }

            /*
             * 2. Extract URL information
             */
            $urlInformation = $this->extractor->extract(
                originalUrl: $originalUrl,
                normalizedUrl: $normalizedUrl,
            );

            /*
             * 3. Display URL information
             */
            $this->displayUrlInformation(
                $urlInformation
            );

            /*
             * 4. Run complete analysis pipeline
             */
            $report = $this->analysisService->analyze(
                $urlInformation
            );

            /*
             * 5. Display provider results
             */
            $this->displayProviders(
                $report
            );

            /*
             * 6. Display risk result
             */
            $this->displayRisk(
                $report
            );

            $this->newLine();

            $this->info(
                'Analysis pipeline selesai.'
            );

            return self::SUCCESS;

        } catch (Throwable $e) {

            $this->newLine();

            $this->error(
                'Analysis pipeline gagal.'
            );

            $this->error(
                $e->getMessage()
            );

            if (config('app.debug')) {

                $this->newLine();

                $this->line(
                    $e->getTraceAsString()
                );
            }

            return self::FAILURE;
        }
    }

    protected function displayUrlInformation(
        object $urlInformation
    ): void {

        $this->info('URL INFORMATION');

        $this->table(
            [
                'Field',
                'Value',
            ],
            [
                [
                    'Original URL',
                    $urlInformation->originalUrl,
                ],
                [
                    'Normalized URL',
                    $urlInformation->normalizedUrl,
                ],
                [
                    'Scheme',
                    $urlInformation->scheme,
                ],
                [
                    'Host',
                    $urlInformation->host,
                ],
                [
                    'Registered Domain',
                    $urlInformation->registeredDomain ?? '-',
                ],
                [
                    'Subdomain',
                    $urlInformation->subdomain ?? '-',
                ],
                [
                    'Port',
                    $urlInformation->port ?? '-',
                ],
                [
                    'Path',
                    $urlInformation->path ?? '-',
                ],
                [
                    'Query',
                    $urlInformation->query ?? '-',
                ],
                [
                    'Fragment',
                    $urlInformation->fragment ?? '-',
                ],
            ]
        );

        $this->newLine();
    }

    protected function displayProviders(
        object $report
    ): void {

        $this->info('PROVIDER RESULTS');

        $rows = [];

        foreach ($report->result->providers as $name => $result) {

            $rows[] = [
                $name,
                $result->success
                    ? 'SUCCESS'
                    : 'FAILED',
                $result->responseTime !== null
                    ? $result->responseTime . ' ms'
                    : '-',
                $result->error ?? '-',
            ];
        }

        $this->table(
            [
                'Provider',
                'Status',
                'Response Time',
                'Error',
            ],
            $rows
        );

        $this->newLine();
    }

    protected function displayRisk(
        object $report
    ): void {

        $this->info('RISK ANALYSIS');

        $this->table(
            [
                'Score',
                'Level',
            ],
            [
                [
                    $report->score,
                    $report->level->value,
                ],
            ]
        );

        $this->newLine();

        $this->info('RISK REASONS');

        if (empty($report->reasons)) {

            $this->line(
                'Tidak ada alasan risiko yang terdeteksi.'
            );

            return;
        }

        $rows = [];

        foreach ($report->reasons as $reason) {

            $rows[] = [
                $reason->provider,
                $reason->message,
                $reason->score,
            ];
        }

        $this->table(
            [
                'Provider',
                'Reason',
                'Score',
            ],
            $rows
        );
    }
}
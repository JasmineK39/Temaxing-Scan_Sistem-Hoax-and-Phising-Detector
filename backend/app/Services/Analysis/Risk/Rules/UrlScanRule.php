<?php

namespace App\Services\Analysis\Risk\Rules;

use App\Services\Analysis\Contracts\RiskRuleInterface;
use App\Services\Analysis\DTO\AnalysisResult;
use App\Services\Analysis\DTO\RiskReason;
use App\Services\Analysis\DTO\UrlScanResult;

class UrlScanRule implements RiskRuleInterface
{
    private const MALICIOUS_SCORE = 40;

    /**
     * @return RiskReason[]
     */
    public function evaluate(
        AnalysisResult $analysis
    ): array {
        $result = $analysis->providers['urlscan'] ?? null;

        /**
         * Provider failure bukan evidence bahwa URL malicious.
         */
        if (
            ! $result instanceof UrlScanResult ||
            ! $result->success
        ) {
            return [];
        }

        if (! $result->malicious) {
            return [];
        }

        return [
            new RiskReason(
                provider: 'URLScan',
                message: 'URLScan mendeteksi URL sebagai malicious.',
                score: self::MALICIOUS_SCORE,
            ),
        ];
    }
}
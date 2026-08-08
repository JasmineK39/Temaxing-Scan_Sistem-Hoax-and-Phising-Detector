<?php

namespace App\Services\Analysis\Risk\Rules;

use App\Services\Analysis\Contracts\RiskRuleInterface;
use App\Services\Analysis\DTO\AnalysisResult;
use App\Services\Analysis\DTO\RiskReason;
use App\Services\Analysis\DTO\UrlScanResult;

class UrlScanRule implements RiskRuleInterface
{
    /**
     * @return RiskReason[]
     */
    public function evaluate(
        AnalysisResult $analysis
    ): array {

        $result = $analysis->providers['urlscan'] ?? null;

        /**
         * Provider gagal bukan evidence bahwa URL malicious.
         */
        if (
            ! $result instanceof UrlScanResult ||
            ! $result->success
        ) {
            return [];
        }

        $reasons = [];

        /*
         * ==========================================================
         * MALICIOUS VERDICT
         * ==========================================================
         *
         * Ini merupakan signal paling kuat dari URLScan.
         */

        if ($result->malicious) {

            $reasons[] = new RiskReason(

                provider: 'URLScan',

                message: 'URLScan mendeteksi URL sebagai malicious.',

                score: 40,

            );
        }

        /*
         * ==========================================================
         * URLSCAN SCORE
         * ==========================================================
         *
         * Score provider tidak digunakan langsung sebagai
         * Risk Engine score.
         *
         * Kita hanya menggunakannya sebagai supporting signal.
         */

        if (
            ! $result->malicious &&
            $result->score !== null &&
            $result->score >= 50
        ) {

            $reasons[] = new RiskReason(

                provider: 'URLScan',

                message: sprintf(
                    'URLScan memberikan risk score %d.',
                    $result->score
                ),

                score: 15,

            );
        }

        /*
         * ==========================================================
         * REDIRECT CHAIN
         * ==========================================================
         *
         * Redirect sendiri bukan bukti phishing.
         *
         * Jangan memberi score hanya karena terdapat redirect.
         */

        return $reasons;
    }
}
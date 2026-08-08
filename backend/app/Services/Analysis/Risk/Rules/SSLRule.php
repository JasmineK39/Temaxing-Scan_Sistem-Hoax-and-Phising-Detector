<?php

namespace App\Services\Analysis\Risk\Rules;

use App\Services\Analysis\Contracts\RiskRuleInterface;
use App\Services\Analysis\DTO\AnalysisResult;
use App\Services\Analysis\DTO\RiskReason;
use App\Services\Analysis\DTO\SSLResult;

class SSLRule implements RiskRuleInterface
{
    /**
     * @return RiskReason[]
     */
    public function evaluate(
        AnalysisResult $analysis
    ): array {

        $result = $analysis->providers['ssl'] ?? null;

        /**
         * SSL provider gagal bukan berarti URL berbahaya.
         */
        if (
            ! $result instanceof SSLResult ||
            ! $result->success
        ) {
            return [];
        }

        /**
         * HTTPS dengan certificate yang valid.
         *
         * Tidak memberikan negative score karena
         * RiskReason saat ini digunakan untuk evidence
         * risiko, bukan evidence keamanan.
         */
        if ($result->sslStatus) {
            return [];
        }

        return [
            new RiskReason(

                provider: 'SSL',

                message: 'Sertifikat SSL tidak valid atau tidak tersedia.',

                score: 20,

            ),
        ];
    }
}
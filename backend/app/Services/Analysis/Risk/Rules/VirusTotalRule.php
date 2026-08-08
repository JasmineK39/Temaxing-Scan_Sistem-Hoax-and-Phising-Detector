<?php

namespace App\Services\Analysis\Risk\Rules;

use App\Services\Analysis\Contracts\RiskRuleInterface;
use App\Services\Analysis\DTO\AnalysisResult;
use App\Services\Analysis\DTO\RiskReason;
use App\Services\Analysis\DTO\VirusTotalResult;

class VirusTotalRule implements RiskRuleInterface
{
    /**
     * @return RiskReason[]
     */
    public function evaluate(
        AnalysisResult $analysis
    ): array {

        $result = $analysis->firstOf(
            VirusTotalResult::class
        );

        if (! $result?->success) {
            return [];
        }

        $reasons = [];

        if ($result->malicious > 0) {

            $reasons[] = new RiskReason(

                provider: 'VirusTotal',

                message: sprintf(
                    '%d security engine mendeteksi URL sebagai malicious.',
                    $result->malicious
                ),

                score: 50,

            );

        }

        if ($result->suspicious > 0) {

            $reasons[] = new RiskReason(

                provider: 'VirusTotal',

                message: sprintf(
                    '%d security engine menandai URL sebagai suspicious.',
                    $result->suspicious
                ),

                score: 20,

            );

        }

        return $reasons;

    }
}
<?php

namespace App\Services\Analysis\Risk;

use App\Services\Analysis\Contracts\RiskRuleInterface;
use App\Services\Analysis\DTO\AnalysisResult;
use App\Services\Analysis\DTO\RiskReason;

class RiskEngine
{
    /**
     * @param RiskRuleInterface[] $rules
     */
    public function __construct(
        protected array $rules,
    ) {
    }

    /**
     * Menjalankan seluruh rule dan mengumpulkan alasan risiko.
     *
     * @return RiskReason[]
     */
    public function analyze(
        AnalysisResult $analysis
    ): array {

        $reasons = [];

        foreach ($this->rules as $rule) {

            $reasons = array_merge(

                $reasons,

                $rule->evaluate(
                    $analysis
                )

            );

        }

        return $reasons;

    }
}
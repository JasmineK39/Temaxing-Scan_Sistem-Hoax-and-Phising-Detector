<?php

namespace App\Services\Analysis\Risk;

use App\Services\Analysis\DTO\RiskReason;

class RiskScorer
{
    /**
     * Hitung total skor risiko.
     *
     * @param RiskReason[] $reasons
     */
    public function calculate(
        array $reasons
    ): int {

        return array_sum(

            array_map(

                fn (RiskReason $reason) => $reason->score,

                $reasons

            )

        );

    }
}
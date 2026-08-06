<?php

namespace App\Services\Analysis\DTO;

use App\Services\Analysis\Enums\RiskLevel;

class RiskReport
{
    /**
     * @param RiskReason[] $reasons
     */
    public function __construct(

        /**
         * Total skor risiko (0–100).
         */
        public readonly int $score,

        /**
         * Level risiko.
         */
        public readonly RiskLevel $level,

        /**
         * Daftar alasan yang membentuk skor.
         */
        public readonly array $reasons,

    ) {
    }
}
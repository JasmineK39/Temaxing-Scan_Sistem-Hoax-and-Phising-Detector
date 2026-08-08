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
         * Hasil seluruh provider analisis.
         */
        public readonly AnalysisResult $result,

        /**
         * Total heuristic risk score.
         *
         * Nilai ini merupakan hasil penjumlahan seluruh
         * kontribusi skor dari RiskRule dan tidak harus
         * berada pada rentang 0–100.
         */
        public readonly int $score,

        /**
         * Level risiko hasil klasifikasi.
         */
        public readonly RiskLevel $level,

        /**
         * Daftar alasan yang berkontribusi terhadap skor risiko.
         *
         * @var RiskReason[]
         */
        public readonly array $reasons,

    ) {
    }
}
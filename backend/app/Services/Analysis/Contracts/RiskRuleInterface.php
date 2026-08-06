<?php

namespace App\Services\Analysis\Contracts;

use App\Services\Analysis\DTO\AnalysisResult;
use App\Services\Analysis\DTO\RiskReason;

interface RiskRuleInterface
{
    /**
     * Mengevaluasi satu aspek risiko berdasarkan hasil analisis.
     *
     * Return null jika rule tidak menemukan indikator risiko.
     */
    public function evaluate(
        AnalysisResult $analysis
    ): array;
}
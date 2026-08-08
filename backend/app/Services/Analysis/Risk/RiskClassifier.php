<?php

namespace App\Services\Analysis\Risk;

use App\Services\Analysis\Enums\RiskLevel;

class RiskClassifier
{
    /**
     * Threshold maksimum untuk setiap level risiko.
     *
     * Catatan:
     * Nilai ini merupakan business rule dan dapat dikalibrasi
     * berdasarkan hasil pengujian di masa mendatang.
     */
    private const SAFE_MAX = 10;

    private const LOW_MAX = 30;

    private const MEDIUM_MAX = 60;

    private const HIGH_MAX = 85;

    /**
     * Mengklasifikasikan skor risiko menjadi level risiko.
     */
    public function classify(
        int $score
    ): RiskLevel {

        return match (true) {

            $score <= self::SAFE_MAX
                => RiskLevel::SAFE,

            $score <= self::LOW_MAX
                => RiskLevel::LOW,

            $score <= self::MEDIUM_MAX
                => RiskLevel::MEDIUM,

            $score <= self::HIGH_MAX
                => RiskLevel::HIGH,

            default
                => RiskLevel::CRITICAL,

        };

    }
}
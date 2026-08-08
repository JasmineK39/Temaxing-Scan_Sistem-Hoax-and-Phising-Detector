<?php

namespace App\Services\Analysis\Risk\Rules;

use App\Services\Analysis\Contracts\RiskRuleInterface;
use App\Services\Analysis\DTO\AnalysisResult;
use App\Services\Analysis\DTO\PhishTankResult;
use App\Services\Analysis\DTO\RiskReason;

class PhishTankRule implements RiskRuleInterface
{
    private const VERIFIED_AND_VALID_SCORE = 50;

    private const VERIFIED_BUT_INVALID_SCORE = 15;

    private const FOUND_UNVERIFIED_SCORE = 10;

    /**
     * @return RiskReason[]
     */
    public function evaluate(
        AnalysisResult $analysis
    ): array {
        $result = $analysis->providers['phishtank'] ?? null;

        /**
         * Provider failure bukan evidence bahwa URL berbahaya.
         */
        if (
            ! $result instanceof PhishTankResult ||
            ! $result->success
        ) {
            return [];
        }

        /**
         * URL tidak ditemukan di database PhishTank.
         */
        if (! $result->found) {
            return [];
        }

        /**
         * Signal terkuat:
         * ditemukan + diverifikasi + masih valid.
         */
        if (
            $result->verified &&
            $result->valid
        ) {
            return [
                new RiskReason(
                    provider: 'PhishTank',
                    message: 'URL terdaftar di PhishTank dan telah diverifikasi sebagai phishing.',
                    score: self::VERIFIED_AND_VALID_SCORE,
                ),
            ];
        }

        /**
         * Pernah diverifikasi tetapi sekarang tidak valid.
         */
        if ($result->verified) {
            return [
                new RiskReason(
                    provider: 'PhishTank',
                    message: 'URL pernah diverifikasi sebagai phishing, tetapi status laporan saat ini tidak valid.',
                    score: self::VERIFIED_BUT_INVALID_SCORE,
                ),
            ];
        }

        /**
         * Ditemukan tetapi belum diverifikasi.
         */
        return [
            new RiskReason(
                provider: 'PhishTank',
                message: 'URL ditemukan dalam database PhishTank tetapi belum diverifikasi.',
                score: self::FOUND_UNVERIFIED_SCORE,
            ),
        ];
    }
}
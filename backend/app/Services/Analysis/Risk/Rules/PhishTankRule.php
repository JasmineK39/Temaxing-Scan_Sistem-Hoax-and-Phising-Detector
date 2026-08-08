<?php

namespace App\Services\Analysis\Risk\Rules;

use App\Services\Analysis\Contracts\RiskRuleInterface;
use App\Services\Analysis\DTO\AnalysisResult;
use App\Services\Analysis\DTO\PhishTankResult;
use App\Services\Analysis\DTO\RiskReason;

class PhishTankRule implements RiskRuleInterface
{
    /**
     * @return RiskReason[]
     */
    public function evaluate(
        AnalysisResult $analysis
    ): array {

        $result = $analysis->providers['phishtank'] ?? null;

        /**
         * Provider gagal bukan evidence bahwa URL berbahaya.
         */
        if (
            ! $result instanceof PhishTankResult ||
            ! $result->success
        ) {
            return [];
        }

        /*
         * URL tidak ditemukan di database PhishTank.
         */
        if (! $result->found) {
            return [];
        }

        $reasons = [];

        /*
         * ==========================================================
         * VERIFIED + VALID
         * ==========================================================
         *
         * Ini merupakan signal terkuat dari PhishTank.
         */

        if ($result->verified && $result->valid) {

            $reasons[] = new RiskReason(

                provider: 'PhishTank',

                message: 'URL terdaftar di PhishTank dan telah diverifikasi sebagai phishing.',

                score: 50,

            );

            return $reasons;
        }

        /*
         * ==========================================================
         * VERIFIED
         * ==========================================================
         *
         * Sudah diverifikasi, tetapi status valid tidak aktif.
         */

        if ($result->verified) {

            $reasons[] = new RiskReason(

                provider: 'PhishTank',

                message: 'URL terdaftar di PhishTank dan telah diverifikasi.',

                score: 35,

            );

            return $reasons;
        }

        /*
         * ==========================================================
         * FOUND ONLY
         * ==========================================================
         *
         * URL ditemukan di database, tetapi belum terverifikasi.
         *
         * Ini hanya supporting evidence.
         */

        $reasons[] = new RiskReason(

            provider: 'PhishTank',

            message: 'URL ditemukan dalam database PhishTank tetapi belum terverifikasi.',

            score: 15,

        );

        return $reasons;
    }
}
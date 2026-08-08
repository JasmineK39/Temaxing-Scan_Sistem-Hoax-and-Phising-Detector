<?php

namespace App\Services\Analysis\Risk\Rules;

use App\Services\Analysis\Contracts\RiskRuleInterface;
use App\Services\Analysis\DTO\AnalysisResult;
use App\Services\Analysis\DTO\RiskReason;
use App\Services\Analysis\DTO\WhoisResult;

class WhoisRule implements RiskRuleInterface
{
    /**
     * Domain sangat baru.
     *
     * Domain phishing sering kali dibuat tidak lama
     * sebelum digunakan, tetapi domain baru sendiri
     * bukan bukti bahwa domain tersebut malicious.
     */
    private const VERY_NEW_DOMAIN_DAYS = 7;

    /**
     * Domain masih tergolong baru.
     */
    private const NEW_DOMAIN_DAYS = 30;

    /**
     * Domain relatif baru.
     */
    private const RECENT_DOMAIN_DAYS = 90;

    /**
     * Masa berlaku domain hampir habis.
     */
    private const EXPIRING_SOON_DAYS = 7;

    /**
     * Masa berlaku domain cukup dekat.
     */
    private const EXPIRING_RELATIVELY_SOON_DAYS = 30;

    /**
     * @return RiskReason[]
     */
    public function evaluate(
        AnalysisResult $analysis
    ): array {

        $result = $analysis->providers['whois'] ?? null;

        /**
         * Provider tidak tersedia atau result bukan WhoisResult.
         *
         * Provider failure tidak boleh dianggap sebagai
         * evidence bahwa URL berbahaya.
         */
        if (
            ! $result instanceof WhoisResult ||
            ! $result->success
        ) {
            return [];
        }

        $reasons = [];

        /*
         * ==========================================================
         * DOMAIN AGE
         * ==========================================================
         */

        if ($result->domainAge !== null) {

            if ($result->domainAge <= self::VERY_NEW_DOMAIN_DAYS) {

                $reasons[] = new RiskReason(

                    provider: 'WHOIS',

                    message: sprintf(
                        'Domain baru dibuat %d hari yang lalu.',
                        $result->domainAge
                    ),

                    score: 25,

                );

            } elseif ($result->domainAge <= self::NEW_DOMAIN_DAYS) {

                $reasons[] = new RiskReason(

                    provider: 'WHOIS',

                    message: sprintf(
                        'Domain masih tergolong baru, berusia %d hari.',
                        $result->domainAge
                    ),

                    score: 15,

                );

            } elseif ($result->domainAge <= self::RECENT_DOMAIN_DAYS) {

                $reasons[] = new RiskReason(

                    provider: 'WHOIS',

                    message: sprintf(
                        'Domain relatif baru, berusia %d hari.',
                        $result->domainAge
                    ),

                    score: 8,

                );

            }
        }

        /*
         * ==========================================================
         * EXPIRATION
         * ==========================================================
         */

        if ($result->daysUntilExpiration !== null) {

            if (
                $result->daysUntilExpiration >= 0 &&
                $result->daysUntilExpiration <= self::EXPIRING_SOON_DAYS
            ) {

                $reasons[] = new RiskReason(

                    provider: 'WHOIS',

                    message: sprintf(
                        'Domain akan kedaluwarsa dalam %d hari.',
                        $result->daysUntilExpiration
                    ),

                    score: 10,

                );

            } elseif (
                $result->daysUntilExpiration <=
                self::EXPIRING_RELATIVELY_SOON_DAYS
            ) {

                $reasons[] = new RiskReason(

                    provider: 'WHOIS',

                    message: sprintf(
                        'Masa berlaku domain relatif dekat, tersisa %d hari.',
                        $result->daysUntilExpiration
                    ),

                    score: 5,

                );
            }
        }

        return $reasons;
    }
}
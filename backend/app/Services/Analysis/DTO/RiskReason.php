<?php

namespace App\Services\Analysis\DTO;

class RiskReason
{
    public function __construct(

        /**
         * Provider asal.
         *
         * Contoh:
         * virustotal
         * whois
         * ssl
         */
        public readonly string $provider,

        /**
         * Penjelasan singkat.
         */
        public readonly string $message,

        /**
         * Kontribusi skor.
         *
         * Positif = menambah risiko.
         * Negatif = mengurangi risiko.
         */
        public readonly int $score,

    ) {
    }
}
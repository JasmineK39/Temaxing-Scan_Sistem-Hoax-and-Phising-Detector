<?php

namespace App\Services\Analysis\DTO;

class Recommendation
{
    public function __construct(

        /**
         * Judul rekomendasi.
         */
        public readonly string $title,

        /**
         * Penjelasan singkat.
         */
        public readonly string $description,

        /**
         * Prioritas rekomendasi.
         */
        public readonly int $priority,

    ) {
    }
}
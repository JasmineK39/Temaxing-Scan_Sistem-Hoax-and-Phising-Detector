<?php

namespace App\Services\Analysis\DTO;

class DetectionResult
{
    public function __construct(

        public readonly string $engine,

        public readonly string $category,

        public readonly string $result,

        public readonly ?string $method = null,

    ) {
    }
}
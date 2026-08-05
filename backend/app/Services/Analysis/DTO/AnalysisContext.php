<?php

namespace App\Services\Analysis\DTO;

use App\DTO\UrlInformation;

class AnalysisContext
{
    public function __construct(

        public readonly UrlInformation $url,

    ) {
    }
}
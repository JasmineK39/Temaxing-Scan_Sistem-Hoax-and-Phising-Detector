<?php

namespace App\DTO;

class UrlAnalysisResult
{
    public function __construct(

        public string $url,

        public string $normalizedUrl,

        public ?string $domain = null,

        public ?string $registeredDomain = null,

        public ?bool $sslStatus = null,

        public ?int $domainAge = null,

        public int $riskScore = 0,

        public ?string $riskLevel = null,

        public array $whois = [],

        public array $virusTotal = [],

        public array $safeBrowsing = [],

        public array $urlScan = [],

        public array $phishTank = [],

        public ?string $aiModel = null,

        public ?string $aiExplanation = null,

        public ?string $recommendation = null,

    ) {
    }
}
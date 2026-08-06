<?php

namespace App\Services\Analysis;

use App\Services\Analysis\Providers\WhoisService;
use App\Services\Analysis\Providers\SSLService;
use App\Services\Analysis\Providers\VirusTotalService;
use App\Services\Analysis\Providers\UrlScanService;
use App\Services\Analysis\Providers\PhishTankService;

class ProviderRegistry
{
    public function __construct(
        protected WhoisService $whois,
        protected SSLService $rdap,
        protected VirusTotalService $virusTotal,
        protected UrlScanService $urlScan,
        protected PhishTankService $phishTank,
    ) {
    }

    public function all(): array
    {
        return [

            'whois' => $this->whois,

            'rdap' => $this->rdap,

            'virustotal' => $this->virusTotal,

            'urlscan' => $this->urlScan,

            'phishtank' => $this->phishTank,

        ];
    }
}
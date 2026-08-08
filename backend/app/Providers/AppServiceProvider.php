<?php

namespace App\Providers;

use App\Services\Analysis\ProviderRegistry;
use App\Services\Analysis\Providers\PhishTankService;
use App\Services\Analysis\Providers\SSLService;
use App\Services\Analysis\Providers\UrlScanService;
use App\Services\Analysis\Providers\VirusTotalService;
use App\Services\Analysis\Providers\WhoisService;
use App\Services\Analysis\Risk\RiskEngine;
use App\Services\Analysis\Risk\Rules\PhishTankRule;
use App\Services\Analysis\Risk\Rules\SSLRule;
use App\Services\Analysis\Risk\Rules\UrlScanRule;
use App\Services\Analysis\Risk\Rules\VirusTotalRule;
use App\Services\Analysis\Risk\Rules\WhoisRule;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        /*
         * ==========================================================
         * PROVIDER REGISTRY
         * ==========================================================
         */

        $this->app->singleton(
            ProviderRegistry::class,
            function ($app) {

                return new ProviderRegistry(
                    whois: $app->make(WhoisService::class),
                    ssl: $app->make(SSLService::class),
                    virusTotal: $app->make(VirusTotalService::class),
                    urlScan: $app->make(UrlScanService::class),
                    phishTank: $app->make(PhishTankService::class),
                );
            }
        );

        /*
         * ==========================================================
         * RISK ENGINE
         * ==========================================================
         */

        $this->app->singleton(
            RiskEngine::class,
            function ($app) {

                return new RiskEngine(
                    rules: [

                        $app->make(WhoisRule::class),

                        $app->make(SSLRule::class),

                        $app->make(VirusTotalRule::class),

                        $app->make(UrlScanRule::class),

                        $app->make(PhishTankRule::class),

                    ],
                );
            }
        );
    }
}
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\DTO\UrlInformation;
use App\Services\Analysis\Providers\WhoisService;

class TestWhoisProvider extends Command
{
    protected $signature = 'analysis:test-whois {domain}';

    protected $description = 'Test WHOIS provider';

    public function handle(
        WhoisService $whoisService
    ): int {

        $domain = $this->argument('domain');

        $info = new UrlInformation(
            originalUrl: "https://{$domain}",
            normalizedUrl: "https://{$domain}",
            scheme: "https",
            host: $domain,
            registeredDomain: $domain,
            path: "",
            query: "",
            fragment: "",
            port: null,
            subdomain: null,
        );

        $result = $whoisService->analyze($info);

        dump($result);

        return self::SUCCESS;
    }
}
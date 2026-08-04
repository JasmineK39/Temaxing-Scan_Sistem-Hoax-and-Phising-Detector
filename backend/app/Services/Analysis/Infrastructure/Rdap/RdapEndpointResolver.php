<?php

namespace App\Services\Analysis\Infrastructure\Rdap;

use InvalidArgumentException;

class RdapEndpointResolver
{
    /**
     * Registry RDAP yang didukung.
     *
     * Diurutkan dari suffix terpanjang.
     */
    protected array $registries = [

        'co.id' => 'https://rdap.pandi.id/rdap/domain/',
        'ac.id' => 'https://rdap.pandi.id/rdap/domain/',
        'go.id' => 'https://rdap.pandi.id/rdap/domain/',

        'com' => 'https://rdap.verisign.com/com/v1/domain/',
        'net' => 'https://rdap.verisign.com/net/v1/domain/',
        'org' => 'https://rdap.publicinterestregistry.org/rdap/domain/',
        'id'  => 'https://rdap.pandi.id/rdap/domain/',

    ];

    public function resolve(
        string $domain
    ): string {

        $domain = strtolower($domain);

        foreach ($this->registries as $suffix => $endpoint) {

            if (
                str_ends_with($domain, '.' . $suffix)
                || $domain === $suffix
            ) {

                return $endpoint . $domain;

            }

        }

        throw new InvalidArgumentException(
            "RDAP registry for '{$domain}' is not supported."
        );
    }
}
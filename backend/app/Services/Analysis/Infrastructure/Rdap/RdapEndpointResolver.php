<?php

namespace App\Services\Analysis\Infrastructure\Rdap;

use InvalidArgumentException;

class RdapEndpointResolver
{
    /**
     * Registry RDAP yang didukung.
     */
    protected array $registries = [

        'com' => 'https://rdap.verisign.com/com/v1/domain/',

        'net' => 'https://rdap.verisign.com/net/v1/domain/',

        'org' => 'https://rdap.publicinterestregistry.org/rdap/domain/',

        'id'  => 'https://rdap.pandi.id/rdap/domain/',

    ];

    public function resolve(
        string $domain
    ): string {

        $tld = strtolower(
            pathinfo(
                $domain,
                PATHINFO_EXTENSION
            )
        );

        if (! isset($this->registries[$tld])) {

            throw new InvalidArgumentException(
                "Unsupported TLD: {$tld}"
            );

        }

        return $this->registries[$tld] . $domain;
    }
}
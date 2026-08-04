<?php

namespace App\Services\Analysis\Infrastructure\VirusTotal;

class VirusTotalUrlEncoder
{
    /**
     * Encode URL menjadi VirusTotal URL Identifier.
     */
    public function encode(
        string $url
    ): string {

        return rtrim(
            strtr(
                base64_encode($url),
                '+/',
                '-_'
            ),
            '='
        );

    }
}
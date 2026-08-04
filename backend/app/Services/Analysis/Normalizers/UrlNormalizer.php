<?php

namespace App\Services\Analysis\Normalizers;

class UrlNormalizer
{
    public function normalize(string $url): string
    {
        $url = trim($url);

        if (! str_starts_with($url, 'http://') &&
            ! str_starts_with($url, 'https://')) {

            $url = 'https://' . $url;
        }

        return filter_var(
            $url,
            FILTER_SANITIZE_URL
        );
    }
}
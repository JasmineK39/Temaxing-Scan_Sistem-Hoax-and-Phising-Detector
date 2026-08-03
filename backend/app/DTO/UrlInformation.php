<?php

namespace App\DTO;

class UrlInformation
{
    public function __construct(

        public string $originalUrl,

        public string $normalizedUrl,

        public string $scheme,

        public string $host,

        public ?string $registeredDomain,

        public ?string $path,

        public ?string $query,

    ) {}
}
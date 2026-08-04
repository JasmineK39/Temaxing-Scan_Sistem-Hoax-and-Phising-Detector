<?php

namespace App\DTO;

class UrlInformation
{
    public function __construct(

        /**
         * URL asli dari user.
         */
        public readonly string $originalUrl,

        /**
         * URL yang sudah dinormalisasi.
         */
        public readonly string $normalizedUrl,

        /**
         * http / https
         */
        public readonly string $scheme,

        /**
         * Full host.
         *
         * sub.example.co.id
         */
        public readonly string $host,

        /**
         * Registered domain.
         *
         * example.co.id
         */
        public readonly ?string $registeredDomain,

        /**
         * Subdomain.
         *
         * sub
         */
        public readonly ?string $subdomain,

        /**
         * Port.
         */
        public readonly ?int $port,

        /**
         * Path.
         */
        public readonly ?string $path,

        /**
         * Query string.
         */
        public readonly ?string $query,

        /**
         * Fragment.
         */
        public readonly ?string $fragment,

    ) {}
}
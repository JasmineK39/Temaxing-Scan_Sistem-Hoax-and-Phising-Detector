<?php

namespace App\Services\Analysis\DTO;

class VirusTotalResult extends ProviderResult
{
    public function __construct(
        bool $success,

        public readonly int $malicious = 0,

        public readonly int $suspicious = 0,

        public readonly int $harmless = 0,

        public readonly int $undetected = 0,

        public readonly int $reputation = 0,

        public readonly array $categories = [],

        public readonly int $timesSubmitted = 0,

        public readonly int $timeout = 0,

public readonly int $failure = 0,

public readonly int $confirmedTimeout = 0,

public readonly int $typeUnsupported = 0,

public readonly ?int $lastAnalysisDate = null,

public readonly ?string $lastFinalUrl = null,

public readonly ?int $httpStatus = null,

        /**
         * Hanya engine yang mendeteksi ancaman.
         */
        /**
         * @var DetectionResult[]
         */
        public readonly array $detections = [],
        /**
         * Disimpan hanya untuk debugging/audit.
         */
        public readonly array $rawData = [],

        ?string $error = null,

        ?int $responseTime = null,
    ) {

        parent::__construct(
            provider: 'VirusTotal',
            success: $success,
            error: $error,
            responseTime: $responseTime,
        );

    }
}
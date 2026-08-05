<?php

namespace App\Services\Analysis\Mappers;

use App\Services\Analysis\DTO\GoogleSafeBrowsingResult;

class GoogleSafeBrowsingResponseMapper
{
    public function map(
        array $json,
        int $responseTime,
    ): GoogleSafeBrowsingResult {

        $matches = data_get(
            $json,
            'matches',
            []
        );

        return new GoogleSafeBrowsingResult(

            success: true,

            unsafe: ! empty($matches),

            threats: $this->mapThreats(
                $matches
            ),

            rawData: config('app.debug')
                ? $matches
                : [],

            responseTime: $responseTime,
        );

    }

    protected function mapThreats(
        array $matches
    ): array {

        return collect($matches)

            ->pluck('threatType')

            ->unique()

            ->values()

            ->all();

    }
}
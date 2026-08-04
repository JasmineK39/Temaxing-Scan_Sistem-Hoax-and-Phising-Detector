<?php

namespace App\Services\Analysis\Mappers;

use App\Services\Analysis\DTO\PhishTankResult;

class PhishTankResponseMapper
{
    public function map(
        array $json,
        int $responseTime
    ): PhishTankResult {

        $results = data_get(
            $json,
            'results',
            []
        );

        $found = (bool) data_get(
            $results,
            'in_database',
            false
        );

        return new PhishTankResult(

            success: true,

            found: $found,

            verified: $found
            ? $this->toBool(
                data_get(
                    $results,
                    'verified'
                )
            )
            : false,

            valid: $found
            ? $this->toBool(
                data_get(
                    $results,
                    'valid'
                )
            )
            : false,

            phishId: $found
            ? $this->toNullableInt(
                data_get(
                    $results,
                    'phish_id'
                )
            )
            : null,

            detailUrl: $found
            ? data_get(
                $results,
                'phish_detail_page'
            )
            : null,

            target: $found
            ? data_get(
                $results,
                'target'
            )
            : null,

            submittedAt: $found
            ? data_get(
                $results,
                'submitted_at'
            )
            : null,

            verifiedAt: $found
            ? data_get(
                $results,
                'verified_at'
            )
            : null,

            rawData: config('app.debug')
            ? $results
            : [],

            responseTime: $responseTime,

        );

    }

    /**
     * Konversi integer kosong menjadi null.
     */
    protected function toNullableInt(
        mixed $value
    ): ?int {

        if (
            $value === null ||
            $value === ''
        ) {
            return null;
        }

        return (int) $value;

    }

    protected function toBool(
        mixed $value
    ): bool {

        return in_array(
            strtolower((string) $value),
            [
                'y',
                'yes',
                'true',
                '1'
            ],
            true
        );

    }
}
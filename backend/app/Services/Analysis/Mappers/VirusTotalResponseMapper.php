<?php

namespace App\Services\Analysis\Mappers;

use App\Services\Analysis\DTO\VirusTotalResult;
use App\Services\Analysis\DTO\DetectionResult;

class VirusTotalResponseMapper
{
    public function map(
        array $json,
        int $responseTime
    ): VirusTotalResult {

        $attributes = data_get(
            $json,
            'data.attributes',
            []
        );

        $stats = data_get(
            $attributes,
            'last_analysis_stats',
            []
        );

        return new VirusTotalResult(

            success: true,

            malicious: (int) data_get(
                $stats,
                'malicious',
                0
            ),

            suspicious: (int) data_get(
                $stats,
                'suspicious',
                0
            ),

            harmless: (int) data_get(
                $stats,
                'harmless',
                0
            ),

            undetected: (int) data_get(
                $stats,
                'undetected',
                0
            ),

            timeout: (int) data_get(
                $stats,
                'timeout',
                0
            ),

            failure: (int) data_get(
                $stats,
                'failure',
                0
            ),

            confirmedTimeout: (int) data_get(
                $stats,
                'confirmed_timeout',
                0
            ),

            typeUnsupported: (int) data_get(
                $stats,
                'type_unsupported',
                0
            ),

            reputation: (int) data_get(
                $attributes,
                'reputation',
                0
            ),

            categories: (array) data_get(
                $attributes,
                'categories',
                []
            ),

            timesSubmitted: (int) data_get(
                $attributes,
                'times_submitted',
                0
            ),

            detections: $this->mapDetections(
                data_get(
                    $attributes,
                    'last_analysis_results',
                    []
                )
            ),

            rawData: config('app.debug')
    ? [
        'id' => data_get($json, 'data.id'),

        'stats' => data_get(
            $attributes,
            'last_analysis_stats'
        ),

        'results' => data_get(
            $attributes,
            'last_analysis_results'
        ),
    ]
    : [],

            responseTime: $responseTime,
        );

    }

    /**
     * Ambil hanya engine yang benar-benar mendeteksi ancaman.
     */
    protected function mapDetections(
        array $results
    ): array {

        $detections = [];

        foreach ($results as $engine => $result) {

            $category = data_get(
                $result,
                'category'
            );

            if (! in_array(
                $category,
                ['malicious', 'suspicious'],
                true
            )) {
                continue;
            }

             $detections[] = new DetectionResult(

            engine: $engine,

            category: $category,

            result: (string) data_get(
                $result,
                'result',
                ''
            ),

            method: data_get(
                $result,
                'method'
            ),

        );

    }

    return $detections;

    }
}
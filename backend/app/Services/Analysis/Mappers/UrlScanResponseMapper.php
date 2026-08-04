<?php

namespace App\Services\Analysis\Mappers;

use App\Services\Analysis\DTO\UrlScanResult;

class UrlScanResponseMapper
{
    public function map(
        array $json,
        int $responseTime
    ): UrlScanResult {

    $page = data_get(
    $json,
    'page',
    []
);

$overall = data_get(
    $json,
    'verdicts.overall',
    []
);

$meta = data_get(
    $json,
    'meta',
    []
);

dump(
    data_get(
        $meta,
        'processors.wappa'
    )
);

        return new UrlScanResult(

            success: true,

            malicious: (bool) data_get(
    $overall,
    'malicious',
    false
),

            score: data_get(
                $overall,
                'score'
            ),

            pageTitle: data_get(
                $page,
                'title'
            ),

            finalUrl: data_get(
                $page,
                'url'
            ),

            ip: data_get(
                $page,
                'ip'
            ),

            asn: data_get(
                $page,
                'asn'
            ),

            country: data_get(
                $page,
                'country'
            ),

            server: data_get(
                $page,
                'server'
            ),

            technologies: $this->mapTechnologies(

                data_get(
                    $meta,
                    'processors.wappa.data',
                    []
                )

            ),

            redirectChain: (array) data_get(
                $json,
                'lists.redirects',
                []
            ),

            screenshot: data_get(
                $json,
                'task.screenshotURL'
            ),

            rawData: [],

            

            responseTime: $responseTime,

        );

        

    }

    /**
     * Ambil hanya nama teknologi.
     */
    protected function mapTechnologies(
        array $technologies
    ): array {

        return array_values(

            array_filter(

                array_map(

                    fn (array $technology) => data_get(
                        $technology,
                        'app'
                    ),

                    $technologies

                )

            )

        );

    }
}
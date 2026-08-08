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

        $wappaData = data_get(
            $meta,
            'processors.wappa.data',
            []
        );

        return new UrlScanResult(

            success: true,

            malicious: (bool) data_get(
                $overall,
                'malicious',
                false
            ),

            score: $this->toNullableInt(
                data_get(
                    $overall,
                    'score'
                )
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
                $wappaData
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

            rawData: config('app.debug')
                ? $json
                : [],

            responseTime: $responseTime,
        );
    }

    /**
     * Ambil hanya nama teknologi.
     *
     * @param array<int, array<string, mixed>> $technologies
     * @return string[]
     */
    protected function mapTechnologies(
        array $technologies
    ): array {

        return array_values(
            array_filter(
                array_map(
                    static function (array $technology): ?string {

                        $app = data_get(
                            $technology,
                            'app'
                        );

                        return is_string($app) && $app !== ''
                            ? $app
                            : null;
                    },
                    $technologies
                )
            )
        );
    }

    /**
     * Konversi nilai menjadi integer nullable.
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

        if (! is_numeric($value)) {
            return null;
        }

        return (int) $value;
    }
}
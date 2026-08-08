<?php

namespace App\Services\Analysis\Risk;

use App\Services\Analysis\DTO\Recommendation;
use App\Services\Analysis\DTO\RiskReason;

class RecommendationEngine
{
    /**
     * @param RiskReason[] $reasons
     *
     * @return Recommendation[]
     */
    public function generate(
        array $reasons
    ): array {

        $recommendations = [];

        foreach ($reasons as $reason) {

            switch ($reason->provider) {

                case 'VirusTotal':

                    $recommendations[] = new Recommendation(

                        title: 'Hindari membuka URL',

                        description: 'Beberapa mesin keamanan mendeteksi URL ini sebagai berbahaya.',

                        priority: 100,

                    );

                    break;

                case 'Whois':

                    $recommendations[] = new Recommendation(

                        title: 'Verifikasi identitas website',

                        description: 'Pastikan domain benar-benar milik organisasi yang Anda tuju.',

                        priority: 70,

                    );

                    break;

                case 'SSL':

                    $recommendations[] = new Recommendation(

                        title: 'Periksa sertifikat HTTPS',

                        description: 'Jangan memasukkan data sensitif apabila sertifikat tidak valid.',

                        priority: 80,

                    );

                    break;

                case 'UrlScan':

                    $recommendations[] = new Recommendation(

                        title: 'Periksa hasil analisis halaman',

                        description: 'Website menunjukkan karakteristik yang perlu diwaspadai.',

                        priority: 60,

                    );

                    break;

                case 'PhishTank':

                    $recommendations[] = new Recommendation(

                        title: 'Jangan lanjutkan akses',

                        description: 'URL teridentifikasi dalam database phishing.',

                        priority: 100,

                    );

                    break;

            }

        }

        usort(

            $recommendations,

            fn (
                Recommendation $a,
                Recommendation $b
            ) => $b->priority <=> $a->priority

        );

        return $recommendations;

    }
}
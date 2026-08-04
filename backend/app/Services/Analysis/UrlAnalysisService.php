<?php

namespace App\Services\Analysis;

use App\DTO\UrlAnalysisResult;
use App\DTO\UrlInformation;
use App\Enums\AnalysisStatus;
use App\Enums\AnalysisType;
use App\Models\Analysis;
use App\Models\UrlAnalysisDetail;
use App\Models\User;
use App\Services\Analysis\Extractors\UrlInfoExtractor;
use App\Services\Analysis\Normalizers\UrlNormalizer;
use App\Services\Analysis\Providers\SSLService;
use Illuminate\Support\Facades\DB;

class UrlAnalysisService
{
    public function __construct(
        protected UrlNormalizer $urlNormalizer,
        protected UrlInfoExtractor $urlInfoExtractor,
        protected SSLService $sslService,
    ) {
    }

    /**
     * Entry point.
     */
    public function analyze(
        User $user,
        string $url
    ): UrlAnalysisResult {

        /**
         * Jalankan seluruh pipeline analisis.
         */
        $result = $this->runPipeline($url);

        /**
         * Simpan ke database.
         */
        DB::transaction(function () use ($user, $result) {

            $analysis = $this->storeAnalysis($user);

            $this->storeDetail(
                $analysis,
                $result
            );
        });

        return $result;
    }

    /**
     * Pipeline analisis.
     */
    protected function runPipeline(
        string $url
    ): UrlAnalysisResult {

        /**
         * Normalize URL.
         */
        $normalizedUrl = $this->urlNormalizer
            ->normalize($url);

        /**
         * Extract URL information.
         */
        $urlInformation = $this->urlInfoExtractor
            ->extract(
                originalUrl: $url,
                normalizedUrl: $normalizedUrl
            );

        /**
         * DTO hasil analisis.
         */
        $result = new UrlAnalysisResult(
            url: $url,
            normalizedUrl: $normalizedUrl,
            domain: $urlInformation->host,
            registeredDomain: $urlInformation->registeredDomain,
        );

        /**
         * SSL Provider.
         */
        $ssl = $this->sslService
            ->analyze($urlInformation);

        if ($ssl->success) {

            $result->sslStatus = $ssl->sslStatus;

        }

        /*
        |--------------------------------------------------------------------------
        | WHOIS
        |--------------------------------------------------------------------------
        */

        // $whois = $this->whoisService->analyze($urlInformation);

        /*
        |--------------------------------------------------------------------------
        | VirusTotal
        |--------------------------------------------------------------------------
        */

        // $virusTotal = ...

        /*
        |--------------------------------------------------------------------------
        | Safe Browsing
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | URLScan
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | PhishTank
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | Risk Calculator
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | Gemini
        |--------------------------------------------------------------------------
        */

        return $result;
    }

    /**
     * Simpan analysis.
     */
    protected function storeAnalysis(
        User $user
    ): Analysis {

        return Analysis::create([

            'user_id' => $user->id,

            'analysis_type' => AnalysisType::URL,

            'status' => AnalysisStatus::COMPLETED,

        ]);
    }

    /**
     * Simpan detail URL.
     */
    protected function storeDetail(
        Analysis $analysis,
        UrlAnalysisResult $result
    ): UrlAnalysisDetail {

        return UrlAnalysisDetail::create([

            'analysis_id' => $analysis->id,

            'url' => $result->url,

            'normalized_url' => $result->normalizedUrl,

            'domain' => $result->domain,

            'registered_domain' => $result->registeredDomain,

            'ssl_status' => $result->sslStatus,

            'domain_age' => $result->domainAge,

            'risk_score' => $result->riskScore,

            'risk_level' => $result->riskLevel,

            'whois_result' => $result->whois,

            'virustotal_result' => $result->virusTotal,

            'safe_browsing_result' => $result->safeBrowsing,

            'urlscan_result' => $result->urlScan,

            'phishtank_result' => $result->phishTank,

            'ai_model' => $result->aiModel,

            'ai_explanation' => $result->aiExplanation,

            'recommendation' => $result->recommendation,

        ]);
    }
}
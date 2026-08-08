<?php

namespace App\Services\Analysis;

use App\DTO\UrlInformation;
use App\Services\Analysis\DTO\RiskReport;
use App\Services\Analysis\Risk\RiskClassifier;
use App\Services\Analysis\Risk\RiskEngine;
use App\Services\Analysis\Risk\RiskScorer;

class AnalysisOrchestrator
{
    public function __construct(

        protected ProviderPipeline $providerPipeline,

        protected RiskEngine $riskEngine,

        protected RiskScorer $riskScorer,

        protected RiskClassifier $riskClassifier,

    ) {
    }

    /**
     * Menjalankan seluruh pipeline analisis URL.
     */
    public function analyze(
        UrlInformation $urlInformation
    ): RiskReport {

        /**
         * 1. Jalankan seluruh provider.
         */
        $analysis = $this->providerPipeline->process(
            $urlInformation
        );

        /**
         * 2. Evaluasi seluruh risk rule.
         */
        $reasons = $this->riskEngine->analyze(
            $analysis
        );

        /**
         * 3. Hitung total risk score.
         */
        $score = $this->riskScorer->calculate(
            $reasons
        );

        /**
         * 4. Klasifikasikan score menjadi risk level.
         */
        $level = $this->riskClassifier->classify(
            $score
        );

        /**
         * 5. Bentuk final risk report.
         */
        return new RiskReport(

            result: $analysis,

            score: $score,

            level: $level,

            reasons: $reasons,

        );
    }
}
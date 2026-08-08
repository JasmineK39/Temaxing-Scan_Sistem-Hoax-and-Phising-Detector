<?php

namespace App\Services\Analysis;

use App\DTO\UrlInformation;
use App\Services\Analysis\DTO\RiskReport;

class AnalysisService
{
    public function __construct(
        protected AnalysisOrchestrator $orchestrator,
    ) {
    }

    /**
     * Menjalankan seluruh pipeline analisis URL
     * dan menghasilkan final RiskReport.
     */
    public function analyze(
        UrlInformation $urlInformation
    ): RiskReport {

        return $this->orchestrator->analyze(
            $urlInformation
        );
    }
}
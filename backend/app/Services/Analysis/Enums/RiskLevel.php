<?php

namespace App\Services\Analysis\Enums;

enum RiskLevel: string
{
    case LOW = 'LOW';

    case MEDIUM = 'MEDIUM';

    case HIGH = 'HIGH';

    case CRITICAL = 'CRITICAL';
}
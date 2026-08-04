<?php

namespace App\Models;

use App\Enums\RiskLevel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UrlAnalysisDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'analysis_id',
        'url',
        'normalized_url',
        'domain',
        'registered_domain',
        'ssl_status',
        'domain_age',
        'risk_score',
        'risk_level',
        'whois_result',
        'virustotal_result',
        'safe_browsing_result',
        'urlscan_result',
        'phishtank_result',
        'ai_model',
        'ai_explanation',
        'recommendation',
    ];

    protected $casts = [
        'ssl_status' => 'boolean',

        'whois_result' => 'array',

        'virustotal_result' => 'array',

        'safe_browsing_result' => 'array',

        'urlscan_result' => 'array',

        'phishtank_result' => 'array',

        'risk_level' => RiskLevel::class,
    ];

    /**
     * Detail URL dimiliki oleh satu analysis.
     */
    public function analysis()
    {
        return $this->belongsTo(Analysis::class);
    }
}
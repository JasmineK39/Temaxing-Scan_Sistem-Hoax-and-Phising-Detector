<?php

namespace App\Models;

use App\Enums\AnalysisStatus;
use App\Enums\AnalysisType;
use App\Models\NewsAnalysisDetail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Analysis extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'analysis_type',
        'status',
    ];

    protected $casts = [
        'analysis_type' => AnalysisType::class,
        'status' => AnalysisStatus::class,
    ];

    /**
     * Analysis dimiliki oleh satu user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Analysis memiliki satu detail URL.
     */
    public function urlAnalysis()
    {
        return $this->hasOne(UrlAnalysisDetail::class);
    }

    /**
     * Analysis memiliki satu detail berita.
     */
    public function newsAnalysis()
    {
        return $this->hasOne(NewsAnalysisDetail::class);
    }
}
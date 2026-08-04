<?php

namespace App\Services\Analysis\Contracts;

interface UrlProvider
{
    public function analyze(string $url): array;
}
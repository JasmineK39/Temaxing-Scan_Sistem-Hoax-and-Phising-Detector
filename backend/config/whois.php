<?php

return [

    /*
    |--------------------------------------------------------------------------
    | WhoisXML API
    |--------------------------------------------------------------------------
    */

    'base_url' => env(
        'WHOIS_BASE_URL',
        'https://www.whoisxmlapi.com'
    ),

    'api_key' => env('WHOIS_API_KEY'),

    'timeout' => env('WHOIS_TIMEOUT', 15),

];
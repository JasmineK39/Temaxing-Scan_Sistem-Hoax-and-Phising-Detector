<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'virustotal' => [

        'api_key' => env('VIRUSTOTAL_API_KEY'),

        'submit_url' => env(
            'VIRUSTOTAL_SUBMIT_URL',
            'https://www.virustotal.com/api/v3/urls'
        ),

        'analysis_url' => env(
            'VIRUSTOTAL_ANALYSIS_URL',
            'https://www.virustotal.com/api/v3/analyses'
        ),

        'url_report_url' => env(
            'VIRUSTOTAL_URL_REPORT_URL',
            'https://www.virustotal.com/api/v3/urls'
        ),

    ],

    'urlscan' => [

        'api_key' => env('URLSCAN_API_KEY'),

        'submit_url' => env(
            'URLSCAN_SUBMIT_URL',
            'https://urlscan.io/api/v1/scan/'
        ),

        'result_url' => env(
            'URLSCAN_RESULT_URL',
            'https://urlscan.io/api/v1/result'
        ),

        'visibility' => env(
        'URLSCAN_VISIBILITY',
        'unlisted'
    ),

    'max_attempts' => env(
        'URLSCAN_MAX_ATTEMPTS',
        20
    ),

    'poll_interval' => env(
        'URLSCAN_POLL_INTERVAL',
        2
    ),

    'timeout' => env(
    'URLSCAN_TIMEOUT',
    90
),

    ],

];

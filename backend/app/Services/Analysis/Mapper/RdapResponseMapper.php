<?php

namespace App\Services\Analysis\Mappers;

use App\Services\Analysis\DTO\WhoisResult;
use Carbon\Carbon;

class RdapResponseMapper
{
    public function map(
        array $json,
        int $responseTime
    ): WhoisResult {

        $creationDate = $this->findEvent(
            $json,
            'registration'
        );

        $expirationDate = $this->findEvent(
            $json,
            'expiration'
        );

        $updatedDate = $this->findEvent(
            $json,
            'last changed'
        );

        return new WhoisResult(

            success: true,

            registrar: $this->extractRegistrar($json),

            creationDate: $creationDate,

            expirationDate: $expirationDate,

            updatedDate: $updatedDate,

            domainAge: $this->calculateAge($creationDate),

            rawData: $json,

            responseTime: $responseTime,
        );
    }

    protected function extractRegistrar(
        array $json
    ): ?string {

        foreach ($json['entities'] ?? [] as $entity) {

            if (! isset($entity['roles'])) {
                continue;
            }

            if (! in_array('registrar', $entity['roles'])) {
                continue;
            }

            return $this->extractFn(
                $entity['vcardArray'] ?? []
            );
        }

        return null;
    }

    protected function extractFn(
        array $vcard
    ): ?string {

        if (
            count($vcard) < 2
        ) {
            return null;
        }

        foreach ($vcard[1] as $item) {

            if (
                ($item[0] ?? null) === 'fn'
            ) {

                return $item[3] ?? null;

            }

        }

        return null;
    }

    protected function findEvent(
        array $json,
        string $action
    ): ?string {

        foreach ($json['events'] ?? [] as $event) {

            if (
                strtolower($event['eventAction'])
                === strtolower($action)
            ) {

                return $event['eventDate'];

            }

        }

        return null;
    }

    protected function calculateAge(
        ?string $creationDate
    ): ?int {

        if (! $creationDate) {
            return null;
        }

        return Carbon::parse($creationDate)
            ->diffInDays(now());
    }
}
<?php

namespace App\Services\Analysis\Mappers;

use App\Services\Analysis\DTO\WhoisResult;
use Carbon\Carbon;

class RdapResponseMapper
{
    public function map(
        array $response,
        int $responseTime
    ): WhoisResult {

        $creationDate = $this->creationDate($response);
        $expirationDate = $this->expirationDate($response);
        $updatedDate = $this->updatedDate($response);

        return new WhoisResult(

            success: true,

            registrar: $this->registrarName($response),

            creationDate: $creationDate,

            expirationDate: $expirationDate,

            updatedDate: $updatedDate,

            domainAge: $this->calculateDomainAge($creationDate),

            isRecentlyRegistered: $this->isRecentlyRegistered($creationDate),

            daysUntilExpiration: $this->calculateRemainingDays($expirationDate),

            statuses: $this->statuses($response),

            nameServers: $this->nameServers($response),

            rawData: $response,

            responseTime: $responseTime,
        );
    }

    /**
     * Registrar Name
     */
    protected function registrarName(array $response): ?string
    {
        foreach ($response['entities'] ?? [] as $entity) {

            if (
                in_array('registrar', $entity['roles'] ?? [])
            ) {

                foreach ($entity['vcardArray'][1] ?? [] as $item) {

                    if (
                        ($item[0] ?? null) === 'fn'
                    ) {
                        return $item[3] ?? null;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Creation Date
     */
    protected function creationDate(array $response): ?string
    {
        return $this->findEvent(
            $response,
            'registration'
        );
    }

    /**
     * Expiration Date
     */
    protected function expirationDate(array $response): ?string
    {
        return $this->findEvent(
            $response,
            'expiration'
        );
    }

    /**
     * Updated Date
     */
    protected function updatedDate(array $response): ?string
    {
        return $this->findEvent(
            $response,
            'last changed'
        );
    }

    /**
     * Generic Event Finder
     */
    protected function findEvent(
        array $response,
        string $event
    ): ?string {

        foreach ($response['events'] ?? [] as $item) {

            if (
                ($item['eventAction'] ?? '') === $event
            ) {
                return $item['eventDate'] ?? null;
            }
        }

        return null;
    }

    /**
     * Domain Age (days)
     */
    protected function calculateDomainAge(
        ?string $creationDate
    ): ?int {

        if (!$creationDate) {
            return null;
        }

        return Carbon::parse($creationDate)
            ->diffInDays(now());
    }

    /**
     * Remaining Days
     */
    protected function calculateRemainingDays(
        ?string $expirationDate
    ): ?int {

        if (!$expirationDate) {
            return null;
        }

        return now()->diffInDays(
            Carbon::parse($expirationDate),
            false
        );
    }

    /**
     * Recently Registered?
     */
    protected function isRecentlyRegistered(
        ?string $creationDate
    ): bool {

        if (!$creationDate) {
            return false;
        }

        return Carbon::parse($creationDate)
            ->greaterThan(
                now()->subDays(180)
            );
    }

    /**
     * Status List
     */
    protected function statuses(
        array $response
    ): array {

        return $response['status'] ?? [];
    }

    /**
     * Nameserver List
     */
    protected function nameServers(
        array $response
    ): array {

        return collect(
            $response['nameservers'] ?? []
        )
            ->pluck('ldhName')
            ->filter()
            ->values()
            ->toArray();
    }
}
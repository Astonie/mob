<?php

namespace App\Contracts;

interface SearchEngine
{
    /**
     * @return array{data: array, total: int}
     */
    public function search(string $query, array $types = [], int $perPage = 15, int $page = 1): array;
}

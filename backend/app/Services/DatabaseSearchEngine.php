<?php

namespace App\Services;

use App\Contracts\SearchEngine;
use Illuminate\Support\Facades\DB;

class DatabaseSearchEngine implements SearchEngine
{
    public function search(string $query, array $types = [], int $perPage = 15, int $page = 1): array
    {
        $query = trim($query);
        if ($query === '') {
            return ['data' => [], 'total' => 0];
        }

        $like = '%'.$query.'%';
        $results = collect();

        $searchables = [
            'pages' => ['table' => 'pages', 'columns' => ['title', 'excerpt'], 'label' => 'Page'],
            'projects' => ['table' => 'projects', 'columns' => ['name', 'summary', 'description'], 'label' => 'Project'],
            'minerals' => ['table' => 'minerals', 'columns' => ['name', 'summary', 'description'], 'label' => 'Mineral'],
            'news' => ['table' => 'news_articles', 'columns' => ['title', 'excerpt', 'content'], 'label' => 'News'],
            'documents' => ['table' => 'documents', 'columns' => ['title', 'description'], 'label' => 'Document'],
            'careers' => ['table' => 'careers', 'columns' => ['title', 'summary', 'description'], 'label' => 'Career'],
        ];

        if (! empty($types)) {
            $searchables = array_intersect_key($searchables, array_flip($types));
        }

        foreach ($searchables as $type => $config) {
            $q = DB::table($config['table']);
            $q->where(function ($w) use ($like, $config) {
                foreach ($config['columns'] as $col) {
                    $w->orWhere($col, 'like', $like);
                }
            });
            // only published/active where applicable
            if (in_array($type, ['pages', 'projects', 'news'])) {
                $q->where(function ($w) {
                    $w->where('status', 'published')->orWhere('content_status', 'published');
                });
            }
            $items = $q->limit(20)->get()->map(fn ($row) => [
                'type' => $type,
                'id' => $row->id ?? null,
                'title' => $row->title ?? $row->name ?? '',
                'slug' => $row->slug ?? '',
                'excerpt' => $row->excerpt ?? $row->summary ?? '',
            ]);
            $results = $results->merge($items);
        }

        $total = $results->count();
        $paginated = $results->forPage($page, $perPage)->values();

        return ['data' => $paginated->toArray(), 'total' => $total];
    }
}

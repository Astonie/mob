<?php

namespace App\Traits;

use App\Models\AuditLog;
use App\Models\Revision;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

trait Auditable
{
    protected static function bootAuditable(): void
    {
        static::created(function ($model) {
            self::logAudit($model, 'created');
            self::createRevision($model, 'created');
        });

        static::updated(function ($model) {
            $changes = $model->getChanges();
            unset($changes['updated_at']);
            if (! empty($changes)) {
                self::logAudit($model, 'updated', $model->getOriginal(), $changes);
                self::createRevision($model, 'updated', $changes);
            }
        });

        static::deleted(function ($model) {
            self::logAudit($model, 'deleted');
        });
    }

    protected static function logAudit($model, string $action, $old = null, $new = null): void
    {
        try {
            AuditLog::create([
                'user_id' => Auth::id(),
                'action' => $action,
                'auditable_type' => $model::class,
                'auditable_id' => $model->getKey(),
                'old_values' => $old ? json_encode($old) : null,
                'new_values' => $new ? json_encode($new) : null,
                'ip_address' => Request::ip(),
                'user_agent' => Request::userAgent(),
                'url' => Request::fullUrl(),
            ]);
        } catch (\Throwable $e) {
            // fail silently for audit
        }
    }

    protected static function createRevision($model, string $action, $changes = null): void
    {
        try {
            Revision::create([
                'revisionable_type' => $model::class,
                'revisionable_id' => $model->getKey(),
                'user_id' => Auth::id(),
                'action' => $action,
                'snapshot' => $model->toArray(),
                'changes' => $changes,
            ]);
        } catch (\Throwable $e) {
        }
    }
}

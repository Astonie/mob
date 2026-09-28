<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revision extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = ['revisionable_type', 'revisionable_id', 'user_id', 'action', 'snapshot', 'changes'];

    protected function casts(): array
    {
        return [
            'snapshot' => 'array',
            'changes' => 'array',
        ];
    }

    public function revisionable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

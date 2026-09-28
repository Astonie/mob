<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareerApplication extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'career_id', 'first_name', 'last_name', 'email', 'phone', 'address',
        'cover_letter', 'resume_path', 'resume_original_name', 'additional_documents',
        'status', 'internal_notes', 'reviewed_at', 'reviewed_by',
    ];

    protected function casts(): array
    {
        return [
            'additional_documents' => 'array',
            'reviewed_at' => 'datetime',
        ];
    }

    public function career()
    {
        return $this->belongsTo(Career::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function getFullNameAttribute(): string
    {
        return $this->first_name.' '.$this->last_name;
    }
}

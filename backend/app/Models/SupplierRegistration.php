<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierRegistration extends Model
{
    use HasFactory, HasUlids;

    protected $fillable = [
        'company_name', 'trading_name', 'registration_number', 'tax_id', 'contact_person',
        'email', 'phone', 'alternative_phone', 'address', 'city', 'country', 'website',
        'business_type', 'categories', 'description', 'certifications', 'documents',
        'status', 'rejection_reason', 'reviewed_at', 'reviewed_by',
    ];

    protected function casts(): array
    {
        return [
            'categories' => 'array',
            'certifications' => 'array',
            'documents' => 'array',
            'reviewed_at' => 'datetime',
        ];
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisitorLog extends Model
{
    protected $fillable = ['ip_address', 'path', 'user_agent', 'country', 'city', 'referer'];
}

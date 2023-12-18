<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $table = 'stores';

    protected $fillable = [
        'name',
        'location',
        'phone',
        'email',
        'manager_name',
        'description',  // Corrected spelling here
        'website'
    ];
    
}

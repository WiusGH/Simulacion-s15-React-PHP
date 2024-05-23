<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Amistad extends Model
{
    use HasFactory;

    protected $table = 'amistades';

    protected $fillable = ['user_id', 'amigo_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

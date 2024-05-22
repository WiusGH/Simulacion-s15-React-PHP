<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    use HasFactory;

    protected $table = 'mensaje';
    protected $primaryKey = 'id_mensaje';

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'usuario_has_mensaje', 'mensaje_id', 'usuario_id')
                    ->withTimestamps();
    }
}

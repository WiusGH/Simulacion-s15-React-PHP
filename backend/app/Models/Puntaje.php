<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Puntaje extends Model
{
    use HasFactory;

    protected $table = 'puntaje';
    protected $primaryKey = 'id_puntaje';

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function juego()
    {
        return $this->belongsTo(Juego::class, 'juego_id');
    }
}

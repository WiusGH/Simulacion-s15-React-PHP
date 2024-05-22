<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorito extends Model
{
    use HasFactory;

    protected $table = 'favorito';
    protected $primaryKey = 'id_favorito';

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'usuario_has_favoritos', 'favorito_id_favorito', 'usuario_id')
                    ->withTimestamps();
    }

    public function juegos()
    {
        return $this->belongsToMany(Juego::class, 'favorito_has_juego', 'favorito_id_favorito', 'juego_id_juego')
                    ->withPivot('juego_categoria_id_categoria')
                    ->withTimestamps();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Juego extends Model
{
    use HasFactory;

    protected $table = 'juego';
    protected $primaryKey = 'id_juego';

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'categoria_id_categoria');
    }

    public function puntaje()
    {
        return $this->belongsTo(Puntaje::class, 'puntaje_id_puntaje');
    }

    public function favoritos()
    {
        return $this->belongsToMany(Favorito::class, 'favorito_has_juego', 'juego_id_juego', 'favorito_id_favorito')
                    ->withPivot('juego_categoria_id_categoria')
                    ->withTimestamps();
    }
}

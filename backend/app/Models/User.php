<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use \Laravel\Sanctum\HasApiTokens;
    use HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function favoritos()
    {
        return $this->belongsToMany(Favorito::class, 'usuario_has_favoritos', 'usuario_id', 'favorito_id_favorito')
                    ->withTimestamps();
    }

    public function mensajes()
    {
        return $this->belongsToMany(Mensaje::class, 'usuario_has_mensajes', 'user_id', 'mensaje_id')
                    ->withTimestamps();
    }

    public function puntajes()
    {
        return $this->hasMany(Puntaje::class, 'usuario_id');
    }

    public function amistades()
    {
        return $this->hasMany(Amistad::class, 'user_id');
    }

    public function amigos()
    {
        return $this->belongsToMany(User::class, 'amistades', 'user_id', 'amigo_id');
    }
}

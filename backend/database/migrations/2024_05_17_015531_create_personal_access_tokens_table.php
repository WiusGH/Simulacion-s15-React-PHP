<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up(): void
    {
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->morphs('tokenable');
            $table->string('name');
            $table->string('token', 64)->unique();
            $table->text('abilities')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        Schema::create('categoria', function (Blueprint $table) {
            $table->bigIncrements('id_categoria');
            $table->string('nombre', 255);
            $table->string('descripcion', 255);
            $table->timestamps();
        });

        Schema::create('juego', function (Blueprint $table) {
            $table->bigIncrements('id_juego');
            $table->string('nombre', 255);
            $table->string('descripcion', 45);
            $table->foreignId('categoria_id_categoria')->constrained('categoria', 'id_categoria');
            $table->timestamps();
        });

        Schema::create('puntaje', function (Blueprint $table) {
            $table->bigIncrements('id_puntaje');
            $table->unsignedBigInteger('usuario_id');
            $table->unsignedBigInteger('juego_id');
            $table->integer('puntaje');
            $table->string('comentario', 255)->nullable();
            $table->timestamps();

            $table->foreign('usuario_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('juego_id')->references('id_juego')->on('juego')->onDelete('cascade');

            $table->unique(['usuario_id', 'juego_id']);
        });

        Schema::create('favorito', function (Blueprint $table) {
            $table->bigIncrements('id_favorito');
            $table->timestamps();
        });

        Schema::create('mensajes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('sender_id');
            $table->unsignedBigInteger('receiver_id')->nullable();
            $table->text('mensaje');
            $table->boolean('is_global')->default(false);
            $table->timestamps();

            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('receiver_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('usuario_has_favoritos', function (Blueprint $table) {
            $table->foreignId('usuario_id')->constrained('users', 'id');
            $table->foreignId('favorito_id_favorito')->constrained('favorito', 'id_favorito');
            $table->timestamps();

            $table->primary(['usuario_id', 'favorito_id_favorito']);
        });

        Schema::create('favorito_has_juego', function (Blueprint $table) {
            $table->foreignId('favorito_id_favorito')->constrained('favorito', 'id_favorito');
            $table->foreignId('juego_id_juego')->constrained('juego', 'id_juego');
            $table->foreignId('juego_categoria_id_categoria')->constrained('categoria', 'id_categoria');
            $table->timestamps();

            $table->primary(['favorito_id_favorito', 'juego_id_juego', 'juego_categoria_id_categoria']);
        });

        Schema::create('usuario_has_mensajes', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users', 'id');
            $table->foreignId('mensaje_id')->constrained('mensajes');
            $table->timestamps();

            $table->primary(['user_id', 'mensaje_id']);
        });

        Schema::create('amistades', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('amigo_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('amigo_id')->references('id')->on('users')->onDelete('cascade');

            $table->primary(['user_id', 'amigo_id']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_access_tokens');
        Schema::dropIfExists('categoria');
        Schema::dropIfExists('puntaje');
        Schema::dropIfExists('juego');
        Schema::dropIfExists('favorito');
        Schema::dropIfExists('mensaje');
        Schema::dropIfExists('usuario_has_favoritos');
        Schema::dropIfExists('favorito_has_juego');
        Schema::dropIfExists('usuario_has_mensaje');
    }
};

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificacao.usuario', function (Blueprint $table) {
            $table->increments('usuario_id');
            $table->string('nome');
            $table->boolean('is_ativo');
            $table->boolean('is_admin');
            $table->string('email')->unique();
            $table->string('cpf', 11)->unique()->nullable();
            $table->string('password')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuario');
    }
}

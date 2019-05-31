<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NotificacaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificacao.notificacao', function (Blueprint $table) {
            $table->increments('notificacao_id');
            $table->text('codigo_destinatario');
            $table->integer('mensagem_id');
            $table->dateTime('data_envio');
            $table->boolean('is_notificacao_lida');
        });

        Schema::table('notificacao.notificacao', function (Blueprint $table) {
            $table->foreign('notificacao_id')
                ->references('notificacao_id')
                ->on('notificacao.notificacao');
            $table->foreign('mensagem_id')
                ->references('mensagem_id')
                ->on('notificacao.mensagem');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notificacao.notificacao');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
    public $timestamps = false;
    public $incrementing = true;
    protected $fillable = [
        'codigo_destinatario',
        'mensagem_id',
        'mensagem_externa',
        'data_envio',
        'is_notificacao_lida'
    ];
    protected $primaryKey = "notificacao_id";
    protected $table = 'notificacao.notificacao';

    public function mensagem()
    {
        return $this->hasOne(
            'App\Models\Mensagem',
            'mensagem_id',
            'mensagem_id'
        );
    }

}

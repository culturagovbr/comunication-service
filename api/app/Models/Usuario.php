<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    public $timestamps = false;
    public $incrementing = true;
    protected $fillable = [
        'nome',
        'email',
        'password',
        'is_admin',
        'is_ativo',
        'cpf',
    ];
    protected $primaryKey = "usuario_id";
    protected $table = 'notificacao.usuario';

    public function sistemas()
    {
        return $this->belongsToMany(
            \App\Models\Sistema::class,
            'notificacao.usuario_has_sistema',
            'usuario_id',
            'sistema_id'
        )->as('usuario_has_sistema');
    }

    public function delete()
    {
        $this->sistemas()->delete();

        return parent::delete();
    }

}

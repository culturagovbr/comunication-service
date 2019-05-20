<?php

namespace App\Services;

use App\Models\Sistema as ModeloSistema;
use DB;
use Validator;

class Sistema implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = ModeloSistema::findOrFail($id);
        } else {
            $data = ModeloSistema::all();
        }

        return $data;
    }

    public function criar(array $dados = []): ModeloSistema
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:50'
        ]);
        $validator = Validator::make($dados, [
            "url" => 'required|string|min:3|max:50'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        $dados = array_merge($dados, [
            'is_ativo' => true
        ]);

        return ModeloSistema::create($dados);
    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "descricao" => 'required|string|min:3|max:255',
            "url" => 'required|string|min:3|max:255'
        ]);
        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        if (isset($dados['sistema_id'])) {
            unset($dados['sistema_id']);
        }
        if (isset($dados['created_at'])) {
            unset($dados['created_at']);
        }

        $dataAtual = \Carbon\Carbon::now();
        $dados['updated_at'] = $dataAtual->toDateTimeString();

        return ModeloSistema::where('sistema_id', $id)->update($dados);
    }

    public function desabilitar($id)
    {
        return $this->alterar($id, [
            'is_ativo' => false
        ]);
    }

    public function habilitar($id)
    {
        return $this->alterar($id, [
            'is_ativo' => true
        ]);
    }

    public function remover($sistema_id)
    {
        $mensagem = DB::table('notificacao.mensagem')
            ->where('notificacao.mensagem.sistema_id', $sistema_id)
            ->latest()
            ->first();
        if ($mensagem) {
            throw new \Exception(
                "O sistema está vinculado com a mensagem '{$mensagem->titulo}''"
            );
        }

        $usuarioSistemas = DB::table('notificacao.usuario_has_sistema')
            ->select([
                'notificacao.usuario.nome',
                'notificacao.usuario.email',
            ])
            ->join(
                'notificacao.usuario',
                'notificacao.usuario_has_sistema.usuario_id',
                '=',
                'notificacao.usuario.usuario_id'
            )
            ->where(
                'notificacao.usuario_has_sistema.sistema_id',
                '=',
                $sistema_id
            )->first();
        if ($usuarioSistemas) {
            throw new \Exception(
                "O sistema está vinculado ao usuário '{$usuarioSistemas->nome}' <{$usuarioSistemas->email}>'"
            );
        }

        $sistema = $this->obter($sistema_id);
        if (!$sistema) {
            throw new \Exception("Sistema não encontrado.");
        }
        return $sistema->delete();
    }
}

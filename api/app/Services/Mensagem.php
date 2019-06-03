<?php

namespace App\Services;

use App\Models\Mensagem as ModeloMensagem;
use Carbon\Carbon;
use Validator;

class Mensagem implements IService
{

    public function obter($id = null, array $dados = [])
    {
        $modeloMensagem = ModeloMensagem::with('plataformas:descricao');
        foreach ($dados as $coluna => $dado) {
            $modeloMensagem->where($coluna, $dado);
        }

        if (!empty(trim($id))) {
            return $modeloMensagem->findOrFail($id);
        }

        return $modeloMensagem->get();
    }

    public function criar(array $dados = []): ModeloMensagem
    {
        $validator = Validator::make($dados, [
            "titulo" => 'required|string|min:3|max:50',
            "descricao" => 'required|string|min:3|max:9999',
            "sistema_id" => 'required|int',
            "autor_id" => 'required|int',
            "plataformas" => 'required|array|min:1',
            "plataformas.*.plataforma_id" => 'required|int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        $dados = array_merge($dados, [
            'is_ativo' => true,
            'created_at' => Carbon::now()
        ]);

        $mensagem = ModeloMensagem::create($dados);
        $this->vincularPlataforma($mensagem->mensagem_id, $dados['plataformas']);

        return $this->obter($mensagem->mensagem_id);

    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "descricao" => 'string|min:3|max:50',
            "mensagem" => 'string|min:3|max:9999',
            "sistema_id" => 'int',
            "autor_id" => 'int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        if (isset($dados['mensagem_id'])) {
            unset($dados['mensagem_id']);
        }
        if (isset($dados['created_at'])) {
            unset($dados['created_at']);
        }

        if (isset($dados['plataformas'])) {
            $plataformas = $dados['plataformas'];
            unset($dados['plataformas']);
        }

        $dataAtual = Carbon::now();
        $dados['updated_at'] = $dataAtual->toDateTimeString();

        ModeloMensagem::where('mensagem_id', $id)->update($dados);

        $this->vincularPlataforma($id, $plataformas);

        return $this->obter($id);
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

    public function vincularPlataforma($mensagem_id, array $plataformas)
    {
        $mensagem = ModeloMensagem::findOrFail($mensagem_id);
        foreach ($plataformas as $plataforma) {
            $mensagem->plataformas()->attach($plataforma['plataforma_id']);
        }
    }

    public function remover($id)
    {
        $plataforma = ModeloMensagem::findOrFail($id);
        $plataformas = $plataforma->plataformas();
        $plataformas->where('mensagem_id', '=', $id)->detach();

        return $plataforma->delete();
    }
}

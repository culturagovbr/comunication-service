<?php

namespace App\Services;

use App\Models\Notificacao as ModeloNotificacao;
use Carbon\Carbon;
use DB;
use Validator;
use App\Models\Usuario as ModeloUsuario;

class Notificacao implements IService
{

    public function obter($id = null)
    {
        if (!empty(trim($id))) {
            $data = ModeloNotificacao::with('mensagem')->findOrFail($id);
        } else {
            $data = ModeloNotificacao::with('mensagem')->get();
        }

        return $data;
    }

    public function criar(array $dados = []): ModeloNotificacao
    {
        $validator = Validator::make($dados, [
            "codigo_destinatario" => 'required|string',
            "mensagem_id" => 'required|int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        $dados = array_merge($dados, [
            'is_ativo' => true,
            'is_notificacao_lida' => false,
            'data_envio' => Carbon::now()
        ]);

        $modeloNotificacao = ModeloNotificacao::create($dados);

        $envioEmail = new \App\Services\Email();
        $envioEmail->enviarNotificacaoEmail($dados['mensagem_id']);

        return $this->obter($modeloNotificacao->notificacao_id);
    }

    public function alterar($id, array $dados = [])
    {
        $validator = Validator::make($dados, [
            "is_notificacao_lida" => 'bool',
            "codigo_destinatario" => 'string',
            "mensagem_id" => 'int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        if (isset($dados['notificacao_id'])) {
            unset($dados['notificacao_id']);
        }

        ModeloNotificacao::where('notificacao_id', $id)->update($dados);

        return $this->obter($id);
    }

    public function remover($id)
    {
        $plataforma = ModeloNotificacao::findOrFail($id);
        return $plataforma->delete();
    }

    public function obterNotificacoesUsuarioSistema(
        $usuario_id,
        $sistema_id,
        $is_notificacao_lida
    ) : \Illuminate\Support\Collection
    {
        if (is_null($usuario_id)) {
            throw new \Exception('Identificador do usuário obrigatório.');
        }

        $notificacoesUsuario = $this->obterQueryNotificacoesUsuario();

        $consulta = $notificacoesUsuario
            ->where(
                'notificacao.usuario_has_sistema.usuario_id',
                '=',
                $usuario_id
            )
            ->where(
                'notificacao.notificacao.is_notificacao_lida',
                '=',
                $is_notificacao_lida
            );
//            ->toSql();

        if (!is_null($sistema_id)) {
            $consulta->where('notificacao.mensagem.sistema_id', '=', $sistema_id);
        }

        return $consulta->get();
    }

    public function obterNotificacoesUsuario(
        $usuario_id,
        $is_notificacao_lida
    ) : \Illuminate\Support\Collection
    {
        if (is_null($usuario_id)) {
            throw new \Exception('Identificador do usuário obrigatório.');
        }

        $notificacoesUsuario = $this->obterQueryNotificacoesUsuario()->where(
            'notificacao.usuario_has_sistema.usuario_id',
            '=',
            $usuario_id
        );

        if ($is_notificacao_lida == false) {
            $notificacoesUsuario = $this->obterQueryNotificacoesUsuario()->where(
                'notificacao.usuario_has_sistema.usuario_id',
                '=',
                $usuario_id
            )->where(
                'notificacao.notificacao.is_notificacao_lida',
                '=',
                $is_notificacao_lida
            );
        }

        return $notificacoesUsuario->get();
    }

    private function obterQueryNotificacoesUsuario()
        : \Illuminate\Database\Query\Builder
    {
        return DB::table('notificacao.notificacao')
            ->select([
                'notificacao.notificacao.notificacao_id',
                'notificacao.notificacao.codigo_destinatario',
                'notificacao.notificacao.is_notificacao_lida',
                'notificacao.mensagem.mensagem_id',
                'notificacao.notificacao.data_envio',
                'notificacao.mensagem.titulo',
                'notificacao.mensagem.descricao',
                'notificacao.mensagem.sistema_id',
                'notificacao.mensagem.is_ativo',
                'notificacao.mensagem.autor_id',
                'notificacao.sistema.descricao as sistema',
                'notificacao.usuario_has_sistema.usuario_id as usuario_id'
            ])
            ->join(
                'notificacao.mensagem',
                'notificacao.mensagem_id',
                '=',
                'notificacao.mensagem.mensagem_id'
            )
            ->join(
                'notificacao.usuario_has_sistema',
                'notificacao.mensagem.sistema_id',
                '=',
                'notificacao.usuario_has_sistema.sistema_id'
            )
            ->join(
                'notificacao.sistema',
                'notificacao.usuario_has_sistema.sistema_id',
                '=',
                'notificacao.sistema.sistema_id'
            );
    }

    public function obterNotificacoesSistema($dados)
    {

        $validator = Validator::make($dados, [
            "usuario_id" => 'int',
            "sistema_id" => 'int',
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        }

        $modeloUsuario = ModeloUsuario::with('sistemas')->select(
            'usuario_id',
            'nome',
            'email',
            'cpf',
            'is_ativo',
            'is_admin'
        );
        $resultado = $modeloUsuario->where('usuario_id', $dados['usuario_id'])
            ->where('sistema_id', $dados['sistema_id'])
            ->get();

        return $resultado;
    }

    public function lerNotificacao($notificacao_id, $usuario_id)
    {

        $consulta = DB::table('notificacao.notificacao')
            ->join(
                'notificacao.mensagem',
                'notificacao.mensagem_id',
                '=',
                'notificacao.mensagem.mensagem_id'
            )
            ->join(
                'notificacao.usuario_has_sistema',
                'notificacao.mensagem.sistema_id',
                '=',
                'notificacao.usuario_has_sistema.sistema_id'
            )
            ->where('notificacao.usuario_has_sistema.usuario_id', '=', $usuario_id)
            ->where('notificacao.notificacao.is_notificacao_lida', '=', false);
        $registros = $consulta->get();
        if (!$registros) {
            throw new \Exception(
                "Idenfificador do Usuário e da Notificação divergentes."
            );
        }
        ModeloNotificacao::where(
            'notificacao_id',
            $notificacao_id
        )->update(['is_notificacao_lida' => true]);

        return $this->obter($notificacao_id);

    }
}

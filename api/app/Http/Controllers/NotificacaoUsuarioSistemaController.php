<?php

namespace App\Http\Controllers;

use Psr\Http\Message\ServerRequestInterface;
use Validator;
use Laravel\Lumen\Routing\Controller;

class NotificacaoUsuarioSistemaController extends Controller
{
    public function get(
        ServerRequestInterface $request,
        $usuario_id,
        $sistema_id = null,
        $is_notificacao_lida = false
    )
    {
        $notificacao = new \App\Services\Notificacao();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json(
            $notificacao->obterNotificacoesUsuarioSistema(
                $usuario_id,
                $sistema_id,
                $is_notificacao_lida
            )
        );
    }

    public function patch(ServerRequestInterface $request, $notificacao_id, $usuario_id)
    {
        $notificacao = new \App\Services\Notificacao();
        $dados = array_filter($request->getParsedBody());
        // if(!isset($dados['']))
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($notificacao->lerNotificacao($notificacao_id, $usuario_id));
    }
}

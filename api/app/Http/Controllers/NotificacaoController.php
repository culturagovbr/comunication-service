<?php

namespace App\Http\Controllers;

use App\Exceptions\JsonResponseExceptionHandler;
use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;
use Laravel\Lumen\Routing\Controller;

class NotificacaoController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $notificacao = new \App\Services\Notificacao();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($notificacao->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = array_filter($request->getParsedBody());
        $notificacao = new \App\Services\Notificacao();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($notificacao->criar($dados));
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $dados = array_filter($request->getParsedBody());
        $notificacao = new \App\Services\Notificacao();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($notificacao->alterar($id, $dados));
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        $notificacao = new \App\Services\Notificacao();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($notificacao->remover($id));
    }
}

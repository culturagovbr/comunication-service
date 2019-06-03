<?php

namespace App\Http\Controllers;

use Psr\Http\Message\ServerRequestInterface;
use Validator;
use Laravel\Lumen\Routing\Controller;

class NotificacaoMensagemDinamicaController extends Controller
{
    public function post(ServerRequestInterface $request)
    {
        $dados = array_filter($request->getParsedBody());
        $notificacao = new \App\Services\Notificacao();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($notificacao->criarMensagemDinamica($dados));
    }

}

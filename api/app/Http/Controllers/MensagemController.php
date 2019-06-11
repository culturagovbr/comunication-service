<?php

namespace App\Http\Controllers;

use App\Exceptions\JsonResponseExceptionHandler;
use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;
use Laravel\Lumen\Routing\Controller;

class MensagemController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $mensagem = new \App\Services\Mensagem();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($mensagem->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = array_filter($request->getParsedBody());
        $mensagem = new \App\Services\Mensagem();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($mensagem->criar($dados));
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $dados = array_filter($request->getParsedBody());
        $mensagem = new \App\Services\Mensagem();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($mensagem->alterar($id, $dados));
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        $mensagem = new \App\Services\Mensagem();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($mensagem->remover($id));
    }
}

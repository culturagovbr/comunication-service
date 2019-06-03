<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;
use Laravel\Lumen\Routing\Controller;

class ContaController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $conta = new \App\Services\Conta();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();

        return $response->json($conta->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = array_filter($request->getParsedBody());
        $conta = new \App\Services\Conta();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($conta->criar($dados));
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $dados = array_filter($request->getParsedBody());
        $conta = new \App\Services\Conta();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($conta->alterar($id, $dados));
    }

    public function delete(\Illuminate\Http\Request $request, $id = null)
    {
        $conta = new \App\Services\Conta();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        $dadosUsuarioLogado = $request->user();
        return $response->json($conta->remover($id, $dadosUsuarioLogado));
    }
}

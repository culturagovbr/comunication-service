<?php

namespace App\Http\Controllers;

use App\Exceptions\JsonResponseExceptionHandler;
use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;
use Laravel\Lumen\Routing\Controller;

class SistemaController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $sistema = new \App\Services\Sistema();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($sistema->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = array_filter($request->getParsedBody());
        $sistema = new \App\Services\Sistema();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($sistema->criar($dados));
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $dados = array_filter($request->getParsedBody());
        $sistema = new \App\Services\Sistema();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($sistema->alterar($id, $dados));
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        $sistema = new \App\Services\Sistema();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($sistema->remover($id));
    }
}

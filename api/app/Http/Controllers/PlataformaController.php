<?php

namespace App\Http\Controllers;

use App\Exceptions\JsonResponseExceptionHandler;
use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;
use Laravel\Lumen\Routing\Controller;

class PlataformaController extends Controller
{
    public function get(ServerRequestInterface $request, $id = null)
    {
        $plataforma = new \App\Services\Plataforma();
        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($plataforma->obter($id));
    }

    public function post(ServerRequestInterface $request)
    {
        $dados = array_filter($request->getParsedBody());
        $plataforma = new \App\Services\Plataforma();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($plataforma->criar($dados));
    }

    public function patch(ServerRequestInterface $request, $id = null)
    {
        $dados = array_filter($request->getParsedBody());
        $plataforma = new \App\Services\Plataforma();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($plataforma->alterar($id, $dados));
    }

    public function delete(ServerRequestInterface $request, $id = null)
    {
        $plataforma = new \App\Services\Plataforma();

        /**
         * @var \Illuminate\Http\Response|\Laravel\Lumen\Http\ResponseFactory $response
         */
        $response = response();
        return $response->json($plataforma->remover($id));
//        return $response->json($plataforma->desabilitar($id));
    }
}

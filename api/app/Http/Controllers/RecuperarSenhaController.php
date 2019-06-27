<?php


namespace App\Http\Controllers;


use Psr\Http\Message\ServerRequestInterface;

class RecuperarSenhaController
{
    public function post(ServerRequestInterface $request)
    {
        $dados = array_filter($request->getParsedBody());
        $conta = new \App\Services\Conta();

        $response = response();
        return $response->json($conta->recuperarSenha($dados));

    }

}

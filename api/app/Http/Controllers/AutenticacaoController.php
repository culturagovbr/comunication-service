<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller;
use Illuminate\Validation\ValidationException;
use Psr\Http\Message\ServerRequestInterface;

class AutenticacaoController extends Controller
{
    /**
     * @var \Illuminate\Http\Request
     */
    private $request;

    public function __construct(\Illuminate\Http\Request $request)
    {
        $this->request = $request;
    }

    public function post(\Illuminate\Http\Request $request)
    {
        try {
            /**
             * @var \Illuminate\Http\Response $response
             */
            $response = response();
            $conta = new \App\Services\Conta();
            $usuario = $conta->tratarConta($request);
            $jwt = new \App\Services\JWT();

            return $response->json($jwt->criarToken($usuario), 200);
        } catch (ValidationException $objThrowValidationException) {
            throw new \Exception($objThrowValidationException->getMessage());
        } catch (\Exception $objException) {
            throw $objException;
        }
    }


}

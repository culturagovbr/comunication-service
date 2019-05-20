<?php

namespace App\Services;

use App\Models\Usuario;
use Psr\Http\Message\ServerRequestInterface;
use Validator;

/**
 * Class JWT
 *
 * @package App\Services
 */
class JWT implements IService
{
    private $_emissorToken = "lumen-jwt";
    private $_assuntoToken;
    private $_horarioEmissaoToken;
    private $_tempoExpiracaoToken;

    public function criarToken(Usuario $usuario) : array
    {
        $this->_assuntoToken = $usuario->usuario_id;
        $this->_horarioEmissaoToken = time();
        $this->_tempoExpiracaoToken = $this->_horarioEmissaoToken + 60 * 60;

        $payload = [
            'iss' => $this->_emissorToken,
            'sub' => $this->_assuntoToken,
            'user' => [
                'user_id' => $usuario->usuario_id,
                'name' => $usuario->nome,
                'cpf' => $usuario->cpf,
                'email' => $usuario->email,
                'sistemas' => $usuario->sistemas,
                'is_admin' => $usuario->is_admin,
            ],
            'iat' => $this->_horarioEmissaoToken,
            'exp' => $this->_tempoExpiracaoToken
        ];

        if (!env('JWT_SECRET')) {
            throw new \Exception(
                'Vari&aacute;vel de ambiente `JWT_SECRET` n&atilde;o definida.'
            );
        }

        return [
            'token' => \Firebase\JWT\JWT::encode($payload, env('JWT_SECRET'))
        ];
    }
}

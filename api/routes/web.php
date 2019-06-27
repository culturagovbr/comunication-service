<?php

$router->get('/', function () use ($router) {
    return redirect()->route('api');
});

$router->get('/api', ['as' => 'api', function () use ($router) {
    return response()->json(
        [
            'name' => 'Abigail',
            'state' => 'CA'
        ]
    );
}]);

define('API_VERSION', '1.0');
$apiPattern = 'v1';
$router->group(['prefix' => $apiPattern], function () use ($router) {

    $router->post('/autenticacao/login', 'AutenticacaoController@post');
    $router->post('/conta', 'ContaController@post');
    $router->get(
        '/sistema[/{id}]',
        [
            'uses' => 'SistemaController@get'
        ]
    );

    $router->post('/recuperarSenha', 'RecuperarSenhaController@post');

    $router->group(['middleware' => 'jwt.auth'], function () use ($router) {
        $router->get('/conta[/{id}]', 'ContaController@get');
        $router->patch(
            '/conta/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'ContaController@patch'
            ]
        );
        $router->delete(
            '/conta/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'ContaController@delete'
            ]
        );

        $router->get(
            '/plataforma[/{id}]',
            [
                'middleware' => 'isAdmin',
                'uses' => 'PlataformaController@get'
            ]
        );
        $router->post(
            '/plataforma',
            [
                'middleware' => 'isAdmin',
                'uses' => 'PlataformaController@post'
            ]
        );
        $router->patch(
            '/plataforma/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'PlataformaController@patch'
            ]
        );
        $router->delete(
            '/plataforma/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'PlataformaController@delete'
            ]
        );

        $router->post(
            '/sistema',
            [
                'middleware' => 'isAdmin',
                'uses' => 'SistemaController@post'
            ]
        );
        $router->patch(
            '/sistema/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'SistemaController@patch'
            ]
        );
        $router->delete(
            '/sistema/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'SistemaController@delete'
            ]
        );

        $router->get(
            '/mensagem[/{id}]',
            [
                'middleware' => 'isAdmin',
                'uses' => 'MensagemController@get'
            ]
        );
        $router->post(
            '/mensagem',
            [
                'middleware' => 'isAdmin',
                'uses' => 'MensagemController@post'
            ]
        );
        $router->patch(
            '/mensagem/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'MensagemController@patch'
            ]
        );
        $router->delete(
            '/mensagem/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'MensagemController@delete'
            ]
        );

        $router->get(
            '/notificacao[/{id}]',
            [
                'middleware' => 'isAdmin',
                'uses' => 'NotificacaoController@get'
            ]
        );
        $router->post(
            '/notificacao',
            [
                'middleware' => 'isAdmin',
                'uses' => 'NotificacaoController@post'
            ]
        );
        $router->patch(
            '/notificacao/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'NotificacaoController@patch'
            ]
        );
        $router->delete(
            '/notificacao/{id}',
            [
                'middleware' => 'isAdmin',
                'uses' => 'NotificacaoController@delete'
            ]
        );

        $router->post(
            '/notificacao-sistema',
            [
                'middleware' => 'isAdmin',
                'uses' => 'NotificacaoSistemaController@post'
            ]
        );
        $router->get(
            '/notificacao-usuario-sistema/{usuario_id}[/{sistema_id}[/{is_notificacao_lida}]]',
            'NotificacaoUsuarioSistemaController@get'
        );
        $router->patch(
            '/notificacao-usuario-sistema/{notificacao_id}/{usuario_id}[/{sistema_id}]',
            [
                'middleware' => 'isAdmin',
                'uses' => 'NotificacaoUsuarioSistemaController@patch'
            ],
            'NotificacaoUsuarioSistemaController@patch'
        );

        $router->get(
            '/notificacao-usuario/{usuario_id}[/{is_notificacao_lida}]',
            'NotificacaoUsuarioController@get'
        );
    });
});

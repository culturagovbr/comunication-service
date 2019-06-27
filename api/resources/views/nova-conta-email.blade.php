<p>Ola, {{ $usuario['nome'] }},</p>
<p>Sua conta no sistema de Notificaçao foi criada!!</p>
<b>Seu email de Login: {{ $usuario['email'] }}</b><br>
<b>Sua senha: {{ $usuario['password'] }}</b>
@if(isset($usuario['is_ativo']))
    <p>Status da conta: {{ $usuario['is_ativo'] ? 'Ativa' : 'Inativa'  }}</p>
@endif
@if(isset($usuario['is_admin']))
    <p>Permissoes: {{ $usuario['is_admin'] ? 'Administrador' : 'Usuario'  }}</p>
@endif
<p>Atenciosamente,</p>
<p>serviço de notificacao</p>

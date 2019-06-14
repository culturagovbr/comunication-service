# NotificationService (notification-service)

### Sobre

Serviço com responsabilidade de centralizar e disparar notificações de diversos tipos para sistemas e plataformas que utilizam.

### Módulos

O projeto foi divido em 4 módulos:

- [API](./api)
- Database - Porta 5432
- [WebApp](./webapp/public/README.md) - 
- WebSocket

Para reunir todos os módulos acima, foi criada uma stack Docker da aplicação, contendo os serviços abaixo:
- webapp-service - Porta 8080
- api-service - Porta 9000
- webserver-service - Porta 80
- websocket-service - Porta 8001
- database-service - Porta 5432

##### Tecnologias utilizadas

- Docker
- PHP 7 (php-fpm)
    - Lumen Framework
    - Eloquent ORM
    - PSR4, PSR7
- Nginx
- Javascript
    - Node
    - VueJS + VueX + Vuetify
- Postgres

### Como inicializar a Stack?

**API + WebSocket + WebServer + WebAPP**
```sh
docker-compose up --build --force-recreate
```

### To-Do
- Backend
    - notification-service
        - [x] infra
            - [x] nginx
            - [x] php-fpm
            - [x] postgres
            - [x] websocket
        - [x] api
            - [x] usuario
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] plataforma
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] sistema
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] tipo_notificao
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] tipo_notificacao_has_plataforma
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] notificacoes
                - [x] consultar ( getOne && getAll )
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] Authenticação**
                - [x] Criar camada de autenticação na aplicação
                - [x] Definir rotas e grupos para aplicar tratamentos de acordo com login válido
            - [x] JSON Web Token (JWT)
                - [x] Criar Controller para Autenticação
                - [x] Criar de JSON Web Token (JWT) encapsulando dados do usuário e de expiração da token
                - [x] Criar Middleware para interceptar requisições HTTP e validar dados informados
- Database
    - [x] modelagem
    - [x] criação
    - [x] entry-point
    - [x] script com dados iniciais 
- Frontend
    - [ ] notification-service
        - [ ] painel administrativo
            - [x] plataforma
                - [x] listar
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] sistema
                - [x] listar
                - [x] cadastrar
                - [x] alterar
                - [x] remover
            - [x] notificacoes
                - [x] enviar
                - [x] listar
            - [x] mensagem
                - [x] listar
                - [x] cadastrar
                - [x] remover
            - [x] usuario
                - [x] listar
                - [x] cadastrar
                - [x] alterar
                - [x] remover
        - [x] autenticacao
            - [x] login (senha mestra temporariamente)
            - [x] login - utilizando Backend
            - [x] login - utilizando JWT
            - [x] Controle de Acesso 
        - [ ] Componente Sininho
            - [ ] observar WebSocket
            - [x] exibir 5 últimas notificações
            - [x] visualizar todas as notificações do usuário 
            - [ ] visualizar todas as notificações do usuário em um sistema específico
            - [ ] marcar notificação como lida
            - [x] diálogo para visualização de todas as notificações
        - [ ] Outros  
            - [ ] Definição de usuario como administrador
            - [ ] Restrição de acesso a alguns recursos para quem não tem perfil admin
            - [ ] Estudo de utilização de CORS somente para sistemas cadastrados
            - [ ] Definição de vinculo entre usuario e sistemas para que a aplicação cadastrada consiga consumir o serviço
            - [ ] Criação dinâmica de token para acesso pelos sistemas cadastrados ao sistema de notificacao

# NotificationService (notification-service)

## Sobre

Serviço com responsabilidade de centralizar e disparar notificações de diversos tipos para sistemas e plataformas que utilizam.

## Tecnologias utilizadas

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

## Módulos

O projeto foi divido em 4 módulos:

- [API](./api)
- Database
- [WebApp](./webapp/public/README.md)
- WebSocket

## Serviços Disponíveis

Para reunir todos os módulos acima, foi criada uma stack Docker da aplicação, contendo os serviços abaixo:

- webapp-service - Porta 8080
- api-service - Porta 9000
- webserver-service - Porta 80
- websocket-service - Porta 8001
- database-service - Porta 5432

## Como inicializar a Stack

O comando abaixo servirá para a criação das imagens utilizadas nos serviços referentes a API(PHP-FPM), WebSocket(NodeJs), WebServer(NGINX) e WebApp(NodeJs).

```console
docker-compose up --build --force-recreate
```

## Como testar o front-end da aplicação

Utilizamos como ferramenta para auxiliar os testes no front-end da aplicação o Cypress.

```console
docker-compose -f docker-compose-testwebapp.yml up --force-recreate --exit-code-from cypress
```

## Funcionalidades disponíveis por
  
- [x] Manter Plataformas
- [x] Manter Sistemas
- [x] Manter Notificações
- [x] Manter Mensagens
- [x] Manter Usuários
- [x] Atualização em tempo real
  - [x] Chat
  - [x] Notificações (Sininho)
- [x] Autenticação
  - [x] JSON Web Token (JWT)
- [x] Painel administrativo

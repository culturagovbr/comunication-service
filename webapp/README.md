# Webapp

## Sobre

Módulo responsável por entregar a camada de apresentação da aplicação.

## Tecnologias utilizadas

- Docker
- Websocket
- Javascript
  - Vue
  - VueX
  - Vuetify
- Cypress

## Padronização

Utilizamos o ESLint como ferramenta validação de código. À partir dela é posssível verificar se o código apresenta os padrões mínimos requisitados, garantindo mais qualidade do código-fonte.

## Funcionalidades

### Painel administrativo

O serviço permite gerir visualmente informações de Plataformas, Sistemas, Notificações, Mensagens e Usuários.

### Notificacoes

Atualmente é possível disparar uma notificação para sitemas à partir do sistema de notificações ou à partir de um sistema que consuma a api.

- É possível enviar uma notificação para sistemas vinculados a uma notificação e mensagem à partir do serviço communication-service
- Também é possível fazer o mesmo processo listado acima à partir de um sistema cadastrado que consuma a api do  serviço communication-service

### Chat

Este repositório disponibiliza um componente de chat que pode ser utilizado para comunicação entre membros que estão dentro de uma mesma sala.

Para utilizar o componente basta selecionar um dos sistemas que o usuário logado está vinculado. Dessa maneiro o usuário entrará na mesma sala que um ou muitos estarão.

**OBS:** Os textos enviados dentro do chat não são armazenados no servidor remoto da aplicação. As informações são armazenadas de forma temporária no browser de cada usuário até que a página seja recarregada.

## Integração

### Publicação de pacotes NPM

O serviço disponibiliza meios de publicar seus componentes como um pacotes públicos utilizando o Node Package Manager(NPM), que é um gerenciador de pacotes do Node.

Para gerar um pacote dos componentes, utilize o comando abaixo:

```console
npm run build-bundle
```

Para que seja possível publicar algum pacote no repositório utilizado no [npm](https://npmjs.com) é necesśario fazer um login no repositório NPM.

Para fazer o **login** utilize o comando abaixo:

```console
npm login
```

Para publicar o componente utilize o comando abaixo:

```console
npm publish --access public
```

**OBS:** Os comandos acima são realizados à partir do diretório atual.

### Uso externo

Após a publicação dos pacotes é possível utilizar os componentes existentes em outras aplicações.

Componentes disponíveis:

- communication-service-notificacao-badge
- communication-service-status
- communication-service-chat

Exemplo de utilização:

```console
<communication-service-chat token="xxx"></communication-service-chat>
```

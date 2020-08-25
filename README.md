# ToDo API

Essa aplicação foi desenvolvida com intuito de colocar em prática conhecimentos nas tecnologias NodeJS com API's Restful e banco de dados Postgres e TypeORM utilizando conceitos básicos.

# Dependências

1) Ter instalado Docker no seu computador. Para mais informações de instalação clique aqui: [Install docker](https://docs.docker.com/install/).

2) Ter clonado o [repositório](https://github.com/luizpaulolppa/todo-api) em algum diretório do seu S.O..

# Para rodar a aplicação back-end (API)

        1) $ docker-compose build
        2) $ docker-compose run --rm api bash
        3) $ yarn install
        4) $ yarn migration:run
        5) $ exit (para sair do container)
        6) $ docker-compose up api
        7) A aplicação já deve estar disponível na porta http://localhost:3000.
### Obs.: Para uma melhor visualização das [APIs](https://documenter.getpostman.com/view/1354700/T1LVAQ9a).

# Para acessar bando de dados (Postgres)

1) Pode ser usado qualquer cliente de SQL, mas como exemplo pode ser usado o [DBeaver](https://dbeaver.io/).

# Comandos básicos

## Executar migrations:
yarn typeorm migration:run

## Criar nova migration:
yarn typeorm migration:create -n NAME_MIGRATE

## Reverter última migration:
yarn typeorm migration:revert

## Apresentar migrations executadas:
yarn typeorm migration:show

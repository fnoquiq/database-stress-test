# Go Barber API

## :horse_racing: Iniciar a aplicação:

- O primeiro passo é iniciar os containers do docker referentes aos banco de dados. Para isso basta executar no terminal:

  - PostgreSQL: `docker run --name test-stress -e POSTGRES_PASSWORD=test -p 5433:5432 -d postgres`;

- Após, levantar o container, crie um banco com o nome `test`. Após isso, execute os seguintes comandos:

  - Executar `yarn` para instalar a dependências;

  - Executar `yarn prisma generate` para configurar o prisma e rodar as migrations;

- Por fim, execute `yarn dev` para levantar o servidor.
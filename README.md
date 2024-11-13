# Open foods

## O que é o projeto?

Neste projeto foi desenvolvido uma REST API com o objetivo de fornecer informações nutricionais de alimentos. O projeto é alimentado pelos dados do projeto Open Food Facts, um banco de dados aberto.

### Tech Stack

- JavaScript
- Node.js runtime (v22)
- Fastify
- MongoDB

### Instruções de uso

- Para o ambiente de desenvolvimento:
  - clone o [repositório](https://github.com/evandroishikawa/open-foods)
  - instale as dependências:
    - certifique que você tenha a versão do node.js v22 instalada
    - execute o comando `pnpm i` para instalar as dependências do projeto
  - e para subir o projeto execute `pnpm dev`
---
- Para o ambiente de produção
  - clone o [repositório](https://github.com/evandroishikawa/open-foods)
  - instale as dependências:
    - certifique que você tenha a versão do node.js v22 instalada
    - execute o comando `pnpm i` para instalar as dependências do projeto
  - e para subir o projeto execute `pnpm start`

> Note: o comando `start` executa o script com node e a flag de `--max-old-space` já que na importação de dados da Open Food Facts, é processado arquivos grandes e para não "estourar" o heap do node, estamos forçando a memória alocada para a execução

This is a challenge by [Coodesh](https://coodesh.com/)

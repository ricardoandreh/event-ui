# Event UI

[![GitHub](https://img.shields.io/github/license/ricardoandreh/event-ui)](https://github.com/ricardoandreh/event-ui/blob/master/LICENSE)

Aplicação frontend migrada para React + Redux do [TechTalks](https://github.com/ricardoandreh/techtalks/).

## Getting Started

### Prerequisites

É necessário instalar o gerenciador de pacotes [PNPM](https://pnpm.io/installation).

Instale as dependências:

```sh
pnpm install
```

Para rodar a aplicação em modo desenvolvimento:

```sh
pnpm run dev
```

### Environment Variables

> Há somente uma variável nessa app. Toda variável de ambiente deverá ter o prefixo `VITE_` para ser reconhecida.

|     Name     |           Default value            |                Description                 |
| :----------: | :--------------------------------: | :----------------------------------------: |
| VITE_API_URL | https://techtalks-api.onrender.com | URL da API a ser utilizada nessa aplicação |

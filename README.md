# IPAC - Desafio Técnico Full Stack

Aplicação desenvolvida como solução para o desafio técnico Full Stack da i-PAC Sistemas.

O projeto consiste em um sistema para cadastro e visualização de checklists, permitindo a criação de itens, associação aos checklists e consulta por status.

---

## Tecnologias utilizadas

### Backend

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL

### Frontend

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Infraestrutura

- Docker
- Docker Compose

### Diferenciais implementados

- Docker para ambiente de desenvolvimento
- Progressive Web App (PWA)
- Interface responsiva
- Execução de checklist (Conforme / Não conforme) em memória

---

## Pré-requisitos

Antes de executar o projeto é necessário possuir instalado:

- Docker
- Docker Compose

---

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto utilizando como base o arquivo `.env.example`.

Exemplo:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=ipac

DATABASE_URL=postgresql://postgres:password@postgres:5432/ipac
```

---

## Executando o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/guto2022/IPAC-TesteTecnico.git

cd IPAC-TesteTecnico
```

### 2. Criar o arquivo `.env`

Copie o conteúdo do arquivo:

```text
.env.example
```

para um novo arquivo:

```text
.env
```

### 3. Executar com Docker

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

O backend executará automaticamente as migrações do Prisma durante a inicialização do container.

Após a inicialização, a aplicação estará disponível em:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

> Na primeira execução o Docker poderá levar alguns minutos para baixar as imagens e instalar as dependências.

---

## Banco de dados

Na execução via Docker, as migrações do Prisma são executadas automaticamente durante a inicialização do backend.

Não é necessário executar comandos manualmente.

---

## Funcionalidades implementadas

### Obrigatórias

- Cadastro de itens
- Cadastro de checklists
- Associação entre checklist e itens
- Listagem dos checklists disponíveis
- Visualização dos itens pertencentes ao checklist
- Filtro por status do checklist (Pronto/Rascunho)
- Integração completa entre frontend e backend

### Diferenciais

- Docker
- Progressive Web App (PWA), permitindo a instalação da aplicação em dispositivos compatíveis
- Interface responsiva
- Execução dos itens do checklist (Conforme / Não conforme) sem persistência no banco de dados

---

## Funcionalidades não implementadas

Conforme especificado no desafio, não foram implementadas:

- Autenticação
- Edição de checklists
- Exclusão de checklists
- Histórico
- Dashboard
- Relatórios

A execução dos itens ("Conforme" e "Não conforme") foi implementada apenas em memória. A persistência dessas respostas no banco de dados foi mantida como opcional, conforme descrito no desafio técnico.

---

## Decisões técnicas

- Utilização do Prisma ORM para gerenciamento do banco de dados e execução das migrações.
- Docker Compose para simplificar a configuração e execução do ambiente de desenvolvimento.
- Vue 3 com Composition API para organização dos componentes.
- Tailwind CSS para construção da interface de forma simples e responsiva.
- Progressive Web App (PWA) implementado como diferencial opcional.

---

## Autor

Augusto Belini Gasparetto
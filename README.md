# 📺 SerieLog
 
Projeto Final — Disciplina de Programação Web 2 (IFSP)
 
SerieLog é uma plataforma pessoal de catálogo de séries. O usuário pode adicionar séries que assistiu, marcar como assistida, e remover do catálogo, além de filtrar a listagem por gênero ou status.
 
## 🧱 Estrutura do projeto
 
```
Projeto-SerieLog/
├── serielog-api/        → Backend (JSON Server)
│   └── db.json           → Banco de dados (arquivo JSON)
│
└── serielog-front/      → Frontend (Vue 3)
    └── src/
        ├── assets/        → Estilos globais (main.css)
        ├── components/    → Componentes reutilizáveis
        │   ├── SerieCard.vue      → Exibe uma série
        │   ├── FiltroSeries.vue   → Filtros de gênero/status
        │   └── SerieForm.vue      → Formulário de cadastro
        ├── views/         → Telas da aplicação
        │   ├── HomeView.vue       → Listagem (/)
        │   └── CadastroView.vue   → Cadastro (/series/nova)
        ├── store/         → Estado compartilhado + chamadas à API
        │   └── series.js
        ├── router/        → Configuração das rotas
        │   └── index.js
        ├── App.vue        → Componente raiz (cabeçalho + router-view)
        └── main.js        → Ponto de entrada da aplicação
```
 
## ⚙️ Tecnologias utilizadas
 
- [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- [Vue Router](https://router.vuejs.org/)
- [JSON Server](https://github.com/typicode/json-server) (API REST simulada)
- Vite (build tool)
## 🚀 Como rodar o projeto
 
O projeto tem duas partes que precisam rodar **ao mesmo tempo**, em dois terminais separados.
 
### 1. Backend (API)
 
```bash
cd serielog-api
npm install
npx json-server db.json
```
 
A API ficará disponível em `http://localhost:3000`.
 
### 2. Frontend (Vue)
 
Em outro terminal:
 
```bash
cd serielog-front
npm install
npm run dev
```
 
A aplicação ficará disponível em `http://localhost:5173`.
 
> ⚠️ O backend precisa estar rodando para que a listagem, o cadastro e a remoção de séries funcionem.
 
## 📋 Funcionalidades
 
- **Listagem** — séries carregadas automaticamente da API ao abrir a aplicação
- **Filtro** — por gênero e por status (assistida/pendente), sem recarregar a página
- **Cadastro** — formulário para adicionar novas séries ao catálogo
- **Remoção** — remoção imediata da interface e da API
- **Navegação** — rotas `/` e `/series/nova` via Vue Router, sem reload
- **Componentização** — comunicação entre componentes via *props* (pai → filho) e *emits* (filho → pai)
## 🔌 Endpoints da API
 
| Método | Rota           | Descrição                  |
|--------|----------------|------------------------------|
| GET    | /series        | Lista todas as séries        |
| GET    | /series/:id    | Busca uma série por id       |
| POST   | /series        | Cria uma nova série          |
| PUT    | /series/:id    | Atualiza uma série existente |
| DELETE | /series/:id    | Remove uma série             |
 
## 👥 Equipe
 
- Lana — Listagem, Remoção e Filtro
- Larissa — Cadastro, Navegação (Vue Router) e Componentização
 
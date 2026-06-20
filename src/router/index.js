/**
 * router/index.js — Configuração do Vue Router
 *
 * O Vue Router permite criar uma SPA (Single Page Application),
 * onde a navegação entre telas acontece SEM recarregar a página.
 *
 * createRouter: cria a instância do router
 * createWebHistory: usa a History API do navegador (URLs limpas, sem #)
 *
 * Rotas obrigatórias:
 *   /             → Listagem de séries (HomeView)
 *   /series/nova  → Formulário de cadastro (CadastroView)
 *
 * Rota de desafio (bônus):
 *   /series/:id   → Edição de série (EditarView)
 */

import { createRouter, createWebHistory } from 'vue-router'

// Importação das Views (telas da aplicação)
// Cada view é um componente Vue que representa uma página inteira
import HomeView from '../views/HomeView.vue'
import CadastroView from '../views/CadastroView.vue'

// Definição das rotas da aplicação
// Cada objeto no array representa uma rota com:
//   - path: o caminho na URL
//   - name: nome identificador da rota (usado em <router-link :to="{ name: '...' }">)
//   - component: o componente Vue a ser renderizado quando a rota é acessada
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/series/nova',
    name: 'cadastro',
    component: CadastroView
  }
]

// Criação da instância do router
// createWebHistory() usa a History API, permitindo URLs como /series/nova
// (sem o # que o modo hash usaria: /#/series/nova)
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Exportamos o router para ser registrado em main.js com app.use(router)
export default router

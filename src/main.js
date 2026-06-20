/**
 * main.js — Ponto de entrada da aplicação Vue
 *
 * Aqui criamos a instância Vue, registramos o Vue Router
 * e montamos a aplicação no elemento #app do index.html.
 */

// createApp: função do Vue 3 para criar a instância da aplicação
import { createApp } from 'vue'

// Componente raiz da aplicação
import App from './App.vue'

// Importação do router configurado (com as rotas / e /series/nova)
import router from './router'

// Importação dos estilos globais da aplicação
import './assets/main.css'

// Criação da app Vue, uso do router e montagem no DOM
const app = createApp(App)

// .use(router) — registra o Vue Router na aplicação,
// habilitando <router-view> e <router-link>
app.use(router)

// .mount('#app') — conecta a aplicação ao elemento HTML com id="app"
app.mount('#app')

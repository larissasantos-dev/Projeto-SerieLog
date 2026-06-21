<!--
  CadastroView.vue — Tela de Cadastro (Rota: /series/nova)

  RESPONSABILIDADE:
    Placeholder para a Dupla 2 implementar o formulário de cadastro.
    A Dupla 2 irá criar o componente SerieForm.vue e integrá-lo aqui.

  NOTA: Este arquivo contém a estrutura base da página.
  A Dupla 2 deve substituir o conteúdo pelo formulário real (SerieForm).

  Por enquanto, mostramos uma mensagem indicando que o formulário
  será implementado pela Dupla 2, com um link para voltar à listagem.
-->

<template>
  <div class="cadastro-view">

    <!-- Cabeçalho da página de cadastro -->
    <div class="page-header fade-in-up">
      <!--
        router-link para voltar à listagem.
        Usa a rota nomeada 'home' (definida no router/index.js).
      -->
      <router-link to="/" class="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        Voltar ao Catálogo
      </router-link>
      <h1 class="page-title">Nova Série</h1>
      <p class="page-subtitle">Adicione uma nova série ao seu catálogo</p>
    </div>
 

    <!-- ============================================================
         ÁREA DO FORMULÁRIO
         A Dupla 2 deve substituir este bloco pelo componente
         <SerieForm /> com os campos: titulo, genero, nota, ano, assistida.
         
         Exemplo de como ficará:
         <SerieForm @salvar="cadastrarSerie" />
         ============================================================ -->
    <SerieForm @salvar="cadastrarSerie"/>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SerieForm from '../components/SerieForm.vue'

const router = useRouter()

async function cadastrarSerie(dados){
  await fetch('http://localhost:3000/series', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(dados)
  })
  router.push('/')
}
</script>

<style scoped>
/* ==========================================================================
   ESTILOS DA TELA DE CADASTRO
   ========================================================================== */
.cadastro-view {
  padding-bottom: 40px;
}

/* Cabeçalho com link de voltar */
.page-header {
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

/* Link "Voltar ao Catálogo" com ícone de seta */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-secondary) !important;
  margin-bottom: 16px;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--accent-secondary) !important;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 4px;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
}
</style>

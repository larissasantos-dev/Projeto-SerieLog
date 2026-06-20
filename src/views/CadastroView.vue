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
    <div class="form-placeholder fade-in-up">
      <div class="placeholder-icon">📝</div>
      <h2 class="placeholder-title">Formulário de Cadastro</h2>
      <p class="placeholder-text">
        Este formulário será implementado pela <strong>Dupla 2</strong>.
      </p>
      <p class="placeholder-text">
        O componente <code>SerieForm.vue</code> deverá ser criado com os campos:
        título, gênero, nota, ano e status de assistida.
      </p>

      <!-- Link para voltar à listagem -->
      <router-link to="/" class="btn btn-primary" style="margin-top: 20px;">
        ← Voltar para o Catálogo
      </router-link>
    </div>

  </div>
</template>

<script setup>
/**
 * CadastroView — Script
 *
 * Atualmente sem lógica, pois o formulário será implementado pela Dupla 2.
 *
 * Quando a Dupla 2 implementar, este script deverá:
 * 1. Importar o componente SerieForm
 * 2. Ter uma função cadastrarSerie(dadosSerie) que:
 *    - Faz POST na API com os dados do formulário
 *    - Redireciona para a listagem após o cadastro
 *
 * Exemplo de como ficará:
 *
 * import { useRouter } from 'vue-router'
 * import SerieForm from '../components/SerieForm.vue'
 *
 * const router = useRouter()
 *
 * async function cadastrarSerie(dados) {
 *   await fetch('http://localhost:3000/series', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(dados)
 *   })
 *   router.push('/')
 * }
 */
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

/* --------------------------------------------------------------------------
   PLACEHOLDER DO FORMULÁRIO
   Exibido temporariamente até a Dupla 2 implementar o formulário.
   -------------------------------------------------------------------------- */
.form-placeholder {
  background: var(--bg-secondary);
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-lg);
  padding: 60px 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 8px;
}

.placeholder-title {
  font-size: 1.5rem;
  font-weight: 700;
}

.placeholder-text {
  color: var(--text-secondary);
  max-width: 500px;
  line-height: 1.6;
}

.placeholder-text code {
  background: var(--bg-tertiary);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--accent-secondary);
}
</style>

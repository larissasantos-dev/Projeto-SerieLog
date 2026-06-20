<!--
  App.vue — Componente Raiz da Aplicação

  Este é o componente principal que envolve toda a aplicação.
  Ele contém:
    - O cabeçalho (header) com a navegação
    - O <router-view> que renderiza a tela correspondente à rota atual

  O <router-view> é o ponto onde o Vue Router injeta o componente
  da rota ativa. Por exemplo:
    - Na rota "/", renderiza HomeView
    - Na rota "/series/nova", renderiza CadastroView

  O <router-link> funciona como um <a>, mas SEM recarregar a página.
  Ele apenas altera a URL e o Vue Router troca o componente exibido.
-->

<template>
  <!-- Container principal da aplicação -->
  <div id="serielog-app">

    <!-- ============================================================
         HEADER — Barra de navegação fixa no topo
         Contém o logo/título e os links de navegação.
         ============================================================ -->
    <header class="app-header">
      <div class="header-content">

        <!-- Logo e título da aplicação -->
        <div class="header-brand">
          <!-- Ícone de TV estilizado com emoji -->
          <span class="brand-icon">📺</span>
          <!-- router-link para "/" — ao clicar, volta para a home sem recarregar -->
          <router-link to="/" class="brand-title">
            Serie<span class="brand-highlight">Log</span>
          </router-link>
        </div>

        <!-- Navegação principal -->
        <nav class="header-nav">
          <!--
            router-link com prop "to" define para qual rota navegar.
            A classe "router-link-exact-active" é adicionada automaticamente
            pelo Vue Router quando a rota está ativa (permite estilizar o link ativo).
          -->
          <router-link to="/" class="nav-link">
            <!-- Ícone SVG inline para o link "Catálogo" -->
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            Catálogo
          </router-link>

          <router-link to="/series/nova" class="nav-link nav-link-add">
            <!-- Ícone de "+" para adicionar série -->
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Nova Série
          </router-link>
        </nav>
      </div>
    </header>

    <!-- ============================================================
         CONTEÚDO PRINCIPAL
         O <router-view> renderiza o componente da rota atual.
         Quando a URL muda, o Vue Router troca automaticamente
         o componente exibido aqui dentro.
         ============================================================ -->
    <main class="app-main">
      <router-view />
    </main>

    <!-- ============================================================
         FOOTER
         ============================================================ -->
    <footer class="app-footer">
      <p>SerieLog &copy; 2025 — Projeto Final de Programação Web 2</p>
    </footer>

  </div>
</template>

<script setup>
/**
 * Este componente não possui lógica própria (script).
 * Ele serve apenas como layout principal com header, conteúdo e footer.
 * O Vue Router controla qual view é renderizada dentro do <router-view>.
 */
</script>

<style scoped>
/* ==========================================================================
   ESTILOS DO APP.VUE
   "scoped" significa que estes estilos se aplicam SOMENTE a este componente,
   não afetando outros componentes da aplicação.
   ========================================================================== */

/* Layout principal: flexbox vertical para empurrar o footer para baixo */
#serielog-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* --------------------------------------------------------------------------
   HEADER
   Barra fixa no topo com efeito glassmorphism (fundo semi-transparente + blur).
   -------------------------------------------------------------------------- */
.app-header {
  position: sticky;           /* Fica fixo no topo ao rolar a página */
  top: 0;
  z-index: 100;               /* Fica acima de outros elementos */
  background: var(--bg-glass); /* Fundo semi-transparente */
  backdrop-filter: blur(20px); /* Efeito blur (glassmorphism) */
  -webkit-backdrop-filter: blur(20px); /* Suporte Safari */
  border-bottom: 1px solid var(--border-color);
}

/* Container interno do header com largura máxima centralizada */
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Logo à esquerda, nav à direita */
}

/* --------------------------------------------------------------------------
   BRAND (Logo)
   -------------------------------------------------------------------------- */
.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
}

/* Link do título — remove estilo de link padrão */
.brand-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary) !important;
  letter-spacing: -0.02em;
}

/* "Log" com cor de acento para destaque visual */
.brand-highlight {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* --------------------------------------------------------------------------
   NAVEGAÇÃO
   Links de navegação com ícones SVG.
   -------------------------------------------------------------------------- */
.header-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Estilo base dos links de navegação */
.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary) !important;
  transition: all var(--transition-normal);
}

.nav-link:hover {
  color: var(--text-primary) !important;
  background: rgba(99, 102, 241, 0.1);
}

/* Quando o link está ativo (rota atual), destacamos com cor de acento */
.nav-link.router-link-exact-active {
  color: var(--accent-light) !important;
  background: rgba(99, 102, 241, 0.12);
}

/* Botão "Nova Série" com estilo especial */
.nav-link-add {
  background: var(--accent-gradient);
  color: white !important;
  font-weight: 600;
}

.nav-link-add:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
  color: white !important;
}

/* Quando "Nova Série" está ativo, manter o mesmo visual */
.nav-link-add.router-link-exact-active {
  color: white !important;
  background: var(--accent-gradient);
}

/* --------------------------------------------------------------------------
   CONTEÚDO PRINCIPAL
   Área central onde as views são renderizadas.
   flex: 1 faz esta área crescer e empurrar o footer para baixo.
   -------------------------------------------------------------------------- */
.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px;
}

/* --------------------------------------------------------------------------
   FOOTER
   -------------------------------------------------------------------------- */
.app-footer {
  text-align: center;
  padding: 24px;
  color: var(--text-muted);
  font-size: 0.8rem;
  border-top: 1px solid var(--border-color);
}

/* --------------------------------------------------------------------------
   RESPONSIVIDADE
   Adapta o layout para telas menores (mobile).
   -------------------------------------------------------------------------- */
@media (max-width: 640px) {
  .header-content {
    height: auto;
    flex-direction: column;
    padding: 16px 24px;
    gap: 12px;
  }

  .header-nav {
    width: 100%;
  }

  .nav-link {
    flex: 1;
    justify-content: center;
    padding: 10px;
  }
}
</style>

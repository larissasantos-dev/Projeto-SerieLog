<!--
  SerieCard.vue — Componente de Card de Série

  RESPONSABILIDADE:
    Exibir os dados de UMA série em formato de card visual.
    Inclui: título, gênero, nota, ano e status de assistida.
    Possui botão de remover que EMITE evento para o componente pai.

  PROPS (dados recebidos do pai):
    - serie: Object — objeto com os dados da série (titulo, genero, nota, ano, assistida)

  EMITS (eventos enviados para o pai):
    - remover: emitido quando o usuário clica no botão de remover,
      envia o id da série como argumento

  CONCEITOS VUE UTILIZADOS:
    - defineProps: declara as props que o componente aceita
    - defineEmits: declara os eventos que o componente pode emitir
    - Template syntax: {{ }} para interpolação, :class para binding dinâmico
    - @click: diretiva para escutar eventos de clique
-->

<template>
  <!--
    Card da série com animação de entrada (fade-in-up).
    A classe "assistida" é adicionada condicionalmente via :class
    quando serie.assistida é true, permitindo estilização diferenciada.
  -->
  <div class="serie-card fade-in-up" :class="{ assistida: serie.assistida }">

    <!-- ============================================================
         CABEÇALHO DO CARD
         Exibe o status de "Assistida" ou "Pendente" com badge colorido.
         ============================================================ -->
    <div class="card-header">
      <!--
        Badge de status: usa :class para aplicar classe condicional.
        Se serie.assistida for true → classe "badge-assistida" (verde)
        Se serie.assistida for false → classe "badge-pendente" (laranja)
      -->
      <span
        class="status-badge"
        :class="serie.assistida ? 'badge-assistida' : 'badge-pendente'"
      >
        <!-- Ícone muda conforme status: ✓ para assistida, ○ para pendente -->
        {{ serie.assistida ? '✓ Assistida' : '○ Pendente' }}
      </span>

      <!-- Ano de lançamento da série -->
      <span class="card-year">{{ serie.ano }}</span>
    </div>

    <!-- ============================================================
         CORPO DO CARD
         Título, gênero e nota da série.
         ============================================================ -->
    <div class="card-body">
      <!-- Título da série — dado principal em destaque -->
      <h3 class="card-title">{{ serie.titulo }}</h3>

      <!-- Gênero da série -->
      <p class="card-genre">
        <span class="genre-icon">🎭</span>
        {{ serie.genero }}
      </p>

      <!-- Nota da série com exibição visual em destaque -->
      <div class="card-rating">
        <span class="rating-star">⭐</span>
        <span class="rating-value">{{ serie.nota }}</span>
        <span class="rating-max">/ 10</span>
      </div>
    </div>

    <!-- ============================================================
         RODAPÉ DO CARD — Botão de Ação
         O botão de remover usa @click para chamar a função que
         emite o evento "remover" para o componente pai.
         ============================================================ -->
    <div class="card-actions">
      <!--
        @click="emitRemover"
        Ao clicar, chama a função emitRemover() que faz:
        emit('remover', serie.id)
        Isso avisa o componente PAI que esta série deve ser removida.
        O PAI (HomeView) é quem faz a requisição DELETE à API.
      -->
      <button
        class="btn btn-danger btn-remove"
        @click="emitRemover"
        :title="'Remover ' + serie.titulo"
      >
        <!-- Ícone de lixeira SVG -->
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <line x1="10" y1="11" x2="10" y2="17"/>
          <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
        Remover
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * SCRIPT DO COMPONENTE SerieCard
 *
 * defineProps — declara quais dados o componente RECEBE do pai.
 *   Aqui recebemos "serie" que é um objeto obrigatório.
 *   O pai passa via: <SerieCard :serie="objetoSerie" />
 *
 * defineEmits — declara quais eventos o componente pode ENVIAR ao pai.
 *   Aqui declaramos "remover".
 *   O pai escuta via: <SerieCard @remover="funcaoDosPai" />
 */

// defineProps: declara a prop "serie" como um Object obrigatório
// O Vue valida que o pai sempre passe este dado
const props = defineProps({
  serie: {
    type: Object,     // Tipo esperado: um objeto JavaScript
    required: true    // Obrigatório: o componente não funciona sem ele
  }
})

// defineEmits: declara o evento "remover" que este componente pode emitir
// Retorna a função "emit" que usamos para disparar o evento
const emit = defineEmits(['remover'])

/**
 * emitRemover — função chamada quando o botão "Remover" é clicado.
 *
 * Ela usa emit('remover', props.serie.id) para:
 * 1. Disparar o evento 'remover' para o componente pai
 * 2. Enviar o ID da série como argumento
 *
 * O pai (HomeView) recebe este evento e faz a remoção:
 * - Envia DELETE para a API
 * - Remove a série do array reativo local
 */
function emitRemover() {
  emit('remover', props.serie.id)
}
</script>

<style scoped>
/* ==========================================================================
   ESTILOS DO SERIE CARD
   Card com fundo escuro, borda sutil e efeitos de hover.
   ========================================================================== */

.serie-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

/* Linha de acento no topo do card (gradient decorativo) */
.serie-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent-gradient);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

/* Efeito hover: eleva o card e mostra a linha de acento */
.serie-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}

.serie-card:hover::before {
  opacity: 1;
}

/* Card de série assistida: borda turquesa sutil */
.serie-card.assistida {
  border-color: rgba(52, 211, 153, 0.15);
}

/* --------------------------------------------------------------------------
   HEADER DO CARD
   -------------------------------------------------------------------------- */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Badge de status (Assistida / Pendente) */
.status-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}

/* Badge turquesa para séries assistidas */
.badge-assistida {
  background: rgba(52, 211, 153, 0.12);
  color: var(--color-success);
  border: 1px solid rgba(52, 211, 153, 0.25);
}

/* Badge azul para séries pendentes */
.badge-pendente {
  background: rgba(96, 165, 250, 0.12);
  color: var(--accent-blue, #60a5fa);
  border: 1px solid rgba(96, 165, 250, 0.25);
}

/* Ano no canto superior direito */
.card-year {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* --------------------------------------------------------------------------
   BODY DO CARD
   -------------------------------------------------------------------------- */
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Título da série */
.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

/* Gênero com ícone */
.card-genre {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.genre-icon {
  font-size: 0.9rem;
}

/* Nota da série */
.card-rating {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 4px;
}

.rating-star {
  font-size: 1rem;
}

/* Valor numérico da nota em destaque */
.rating-value {
  font-size: 1.75rem;
  font-weight: 800;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.rating-max {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* --------------------------------------------------------------------------
   AÇÕES DO CARD (botão remover)
   -------------------------------------------------------------------------- */
.card-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

/* Botão remover com tamanho reduzido */
.btn-remove {
  font-size: 0.8rem;
  padding: 8px 14px;
}
</style>

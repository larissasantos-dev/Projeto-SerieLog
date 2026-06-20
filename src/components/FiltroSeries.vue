<!--
  FiltroSeries.vue — Componente de Filtros

  RESPONSABILIDADE:
    Fornecer controles para filtrar a lista de séries por:
    - Gênero (select com opções extraídas dos dados)
    - Status de assistida (Todas / Assistidas / Pendentes)

  PROPS (dados recebidos do pai):
    - generos: Array — lista de gêneros únicos disponíveis para filtro
    - filtroGenero: String — gênero atualmente selecionado
    - filtroStatus: String — status atualmente selecionado ('todas', 'assistida', 'pendente')

  EMITS (eventos enviados para o pai):
    - update:filtroGenero — atualiza o filtro de gênero no componente pai
    - update:filtroStatus — atualiza o filtro de status no componente pai

  CONCEITO IMPORTANTE: v-model com componentes
    Usamos o padrão "update:propName" para criar um v-model customizado.
    No pai, podemos usar:
      <FiltroSeries v-model:filtroGenero="generoSelecionado" />
    Que é equivalente a:
      <FiltroSeries :filtroGenero="generoSelecionado" @update:filtroGenero="generoSelecionado = $event" />
-->

<template>
  <!-- Container dos filtros com layout responsivo -->
  <div class="filtro-container fade-in-up">

    <!-- ============================================================
         ÍCONE E TÍTULO DA SEÇÃO DE FILTROS
         ============================================================ -->
    <div class="filtro-header">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
      <span class="filtro-title">Filtros</span>
    </div>

    <!-- ============================================================
         CONTROLES DE FILTRO
         ============================================================ -->
    <div class="filtro-controls">

      <!-- --------------------------------------------------------
           FILTRO POR GÊNERO
           Select com opções geradas dinamicamente a partir da
           prop "generos" usando v-for.
           
           :value="filtroGenero" — vincula o valor selecionado à prop
           @change="$emit(...)" — ao mudar, emite evento para o pai
           -------------------------------------------------------- -->
      <div class="filtro-group">
        <label class="filtro-label" for="filtro-genero">Gênero</label>
        <select
          id="filtro-genero"
          class="form-select"
          :value="filtroGenero"
          @change="$emit('update:filtroGenero', $event.target.value)"
        >
          <!-- Opção padrão: sem filtro de gênero -->
          <option value="">Todos os gêneros</option>

          <!--
            v-for="genero in generos" — itera sobre o array de gêneros
            :key="genero" — chave única para cada item (obrigatório no v-for)
            :value="genero" — valor que será emitido quando selecionado
          -->
          <option
            v-for="genero in generos"
            :key="genero"
            :value="genero"
          >
            {{ genero }}
          </option>
        </select>
      </div>

      <!-- --------------------------------------------------------
           FILTRO POR STATUS
           Grupo de botões (radio visual) para filtrar por:
           - Todas: sem filtro de status
           - Assistidas: apenas séries com assistida === true
           - Pendentes: apenas séries com assistida === false

           Cada botão recebe a classe "active" condicionalmente
           via :class quando o filtroStatus corresponde ao seu valor.
           -------------------------------------------------------- -->
      <div class="filtro-group">
        <label class="filtro-label">Status</label>
        <div class="filtro-buttons">

          <!--
            @click="$emit('update:filtroStatus', 'todas')"
            Ao clicar, emite o evento 'update:filtroStatus' com valor 'todas'.
            O pai atualiza a variável reativa e a computed property
            recalcula automaticamente a lista filtrada.
          -->
          <button
            class="filtro-btn"
            :class="{ active: filtroStatus === 'todas' }"
            @click="$emit('update:filtroStatus', 'todas')"
          >
            Todas
          </button>

          <button
            class="filtro-btn"
            :class="{ active: filtroStatus === 'assistida' }"
            @click="$emit('update:filtroStatus', 'assistida')"
          >
            ✓ Assistidas
          </button>

          <button
            class="filtro-btn"
            :class="{ active: filtroStatus === 'pendente' }"
            @click="$emit('update:filtroStatus', 'pendente')"
          >
            ○ Pendentes
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
/**
 * SCRIPT DO COMPONENTE FiltroSeries
 *
 * defineProps — declara os dados recebidos do componente pai:
 *   - generos: lista de gêneros únicos (Array)
 *   - filtroGenero: gênero selecionado atualmente (String)
 *   - filtroStatus: status selecionado atualmente (String)
 *
 * defineEmits — declara os eventos que este componente emite:
 *   - update:filtroGenero: quando o gênero muda
 *   - update:filtroStatus: quando o status muda
 *
 * Este componente não altera os dados diretamente. Ele apenas
 * COMUNICA ao pai que o usuário alterou um filtro, seguindo o
 * padrão de comunicação filho → pai via emits.
 */

// Props recebidas do pai (HomeView)
defineProps({
  // Lista de gêneros disponíveis para o select
  generos: {
    type: Array,
    required: true
  },
  // Gênero atualmente selecionado (string vazia = todos)
  filtroGenero: {
    type: String,
    required: true
  },
  // Status atualmente selecionado ('todas', 'assistida', 'pendente')
  filtroStatus: {
    type: String,
    required: true
  }
})

// Eventos que o componente pode emitir para o pai
defineEmits(['update:filtroGenero', 'update:filtroStatus'])
</script>

<style scoped>
/* ==========================================================================
   ESTILOS DO FILTRO
   Container com efeito glassmorphism e layout responsivo.
   ========================================================================== */

.filtro-container {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  margin-bottom: 24px;
}

/* Cabeçalho com ícone de filtro */
.filtro-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  color: var(--text-secondary);
}

.filtro-title {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Layout dos controles de filtro */
.filtro-controls {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;      /* Quebra para nova linha em telas pequenas */
  align-items: flex-end;
}

/* Grupo individual de filtro (label + controle) */
.filtro-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 200px;     /* Largura mínima para não ficar muito estreito */
}

/* Label dos filtros */
.filtro-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* --------------------------------------------------------------------------
   BOTÕES DE FILTRO DE STATUS
   Grupo de botões com estilo toggle (um ativo por vez).
   -------------------------------------------------------------------------- */
.filtro-buttons {
  display: flex;
  gap: 6px;
}

.filtro-btn {
  flex: 1;
  padding: 10px 14px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-family: var(--font-family);
  font-size: 0.825rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  white-space: nowrap;
}

.filtro-btn:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}

/* Botão ativo: destaque com cor de acento azul-roxo */
.filtro-btn.active {
  background: rgba(99, 102, 241, 0.15);
  border-color: var(--accent-indigo);
  color: var(--accent-light);
  font-weight: 600;
}

/* --------------------------------------------------------------------------
   RESPONSIVIDADE
   -------------------------------------------------------------------------- */
@media (max-width: 640px) {
  .filtro-controls {
    flex-direction: column;
  }

  .filtro-group {
    min-width: 100%;
  }

  .filtro-buttons {
    flex-direction: column;
  }
}
</style>

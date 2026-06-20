<!--
  HomeView.vue — Tela Principal (Rota: /)

  RESPONSABILIDADE:
    Esta é a view principal da aplicação. Ela:
    1. Carrega automaticamente as séries da API ao ser montada
    2. Exibe a lista de séries usando o componente SerieCard
    3. Permite filtrar por gênero e status usando FiltroSeries
    4. Permite remover séries (DELETE na API + remoção reativa da lista)

  CONCEITOS VUE UTILIZADOS:
    - ref(): cria variáveis reativas (quando mudam, a interface atualiza)
    - computed(): cria propriedades computadas (recalculam automaticamente
      quando suas dependências mudam — usado para os filtros)
    - onMounted(): lifecycle hook — executa código quando o componente
      é montado no DOM (usamos para buscar dados da API)
    - v-for: diretiva para renderizar uma lista de elementos
    - v-if / v-else: renderização condicional
    - @remover: escuta o evento emitido pelo SerieCard

  FLUXO DE DADOS:
    HomeView (pai) → passa dados via props → SerieCard (filho)
    SerieCard (filho) → emite evento 'remover' → HomeView (pai) trata
-->

<template>
  <div class="home-view">

    <!-- ============================================================
         CABEÇALHO DA PÁGINA
         Título e contador de séries.
         ============================================================ -->
    <div class="page-header fade-in-up">
      <div class="page-header-content">
        <h1 class="page-title">Meu Catálogo</h1>
        <p class="page-subtitle">
          <!--
            Exibe contadores dinâmicos:
            - seriesFiltradas.length: quantidade após aplicar filtros
            - series.length: total de séries no catálogo
            Esses valores são reativos — se mudam, o texto atualiza automaticamente.
          -->
          {{ seriesFiltradas.length }} de {{ series.length }} séries
        </p>
      </div>

      <!-- Estatísticas rápidas -->
      <div class="page-stats">
        <div class="stat-item">
          <span class="stat-value">{{ totalAssistidas }}</span>
          <span class="stat-label">Assistidas</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ totalPendentes }}</span>
          <span class="stat-label">Pendentes</span>
        </div>
      </div>
    </div>

    <!-- ============================================================
         COMPONENTE DE FILTROS
         Recebe os dados via props e envia alterações via emits.

         v-model:filtroGenero é um atalho para:
           :filtroGenero="filtroGenero"
           @update:filtroGenero="filtroGenero = $event"

         Quando o FiltroSeries emite um evento de mudança, a variável
         reativa correspondente é atualizada, e como seriesFiltradas
         é uma computed que depende dessas variáveis, a lista é
         automaticamente recalculada e a interface atualiza.
         ============================================================ -->
    <FiltroSeries
      :generos="generosUnicos"
      v-model:filtroGenero="filtroGenero"
      v-model:filtroStatus="filtroStatus"
    />

    <!-- ============================================================
         ESTADO DE CARREGAMENTO
         Exibido enquanto os dados estão sendo buscados da API.
         v-if="carregando" — só renderiza se carregando === true
         ============================================================ -->
    <div v-if="carregando" class="loading-container fade-in-up">
      <div class="loading-spinner"></div>
      <p class="loading-text">Carregando séries...</p>
    </div>

    <!-- ============================================================
         ESTADO DE ERRO
         Exibido quando a requisição à API falha.
         v-else-if="erro" — só renderiza se NÃO está carregando E tem erro
         ============================================================ -->
    <div v-else-if="erro" class="error-container fade-in-up">
      <p class="error-icon">⚠️</p>
      <p class="error-message">{{ erro }}</p>
      <button class="btn btn-primary" @click="carregarSeries">
        Tentar novamente
      </button>
    </div>

    <!-- ============================================================
         LISTA VAZIA (APÓS FILTRO)
         Exibida quando nenhuma série corresponde ao filtro aplicado.
         ============================================================ -->
    <div v-else-if="seriesFiltradas.length === 0" class="empty-container fade-in-up">
      <p class="empty-icon">🔍</p>
      <p class="empty-message">Nenhuma série encontrada com os filtros selecionados.</p>
      <button class="btn btn-outline" @click="limparFiltros">
        Limpar filtros
      </button>
    </div>

    <!-- ============================================================
         GRID DE SÉRIES
         Renderiza um SerieCard para cada série filtrada.

         v-for="serie in seriesFiltradas"
           Itera sobre o array computado 'seriesFiltradas'.
           Para cada item, cria um componente <SerieCard>.

         :key="serie.id"
           Chave única obrigatória no v-for.
           Permite ao Vue rastrear cada item de forma eficiente
           e atualizar apenas os que mudaram.

         :serie="serie"
           Passa o objeto da série como PROP para o SerieCard.
           O SerieCard recebe via defineProps({ serie: Object })

         @remover="removerSerie"
           Escuta o evento 'remover' emitido pelo SerieCard.
           Quando o usuário clica em "Remover" dentro do card,
           o SerieCard emite emit('remover', serie.id),
           e esta view recebe o ID e executa removerSerie(id).
         ============================================================ -->
    <div v-else class="series-grid">
      <SerieCard
        v-for="serie in seriesFiltradas"
        :key="serie.id"
        :serie="serie"
        @remover="removerSerie"
      />
    </div>

  </div>
</template>

<script setup>
/**
 * SCRIPT DA HOME VIEW
 *
 * Gerencia o estado principal da aplicação:
 * - Array de séries carregado da API
 * - Variáveis de filtro
 * - Propriedades computadas para filtragem
 * - Funções para carregar e remover séries
 */

// ref: cria variáveis reativas (quando o valor muda, a UI re-renderiza)
// computed: cria valores derivados que recalculam automaticamente
// onMounted: lifecycle hook executado quando o componente é montado
import { ref, computed, onMounted } from 'vue'

// Importação dos componentes filhos
import SerieCard from '../components/SerieCard.vue'
import FiltroSeries from '../components/FiltroSeries.vue'

// URL base da API (JSON Server rodando localmente)
const API_URL = 'http://localhost:3000/series'

// ==========================================================================
// ESTADO REATIVO
// Variáveis criadas com ref() são REATIVAS: quando seu .value muda,
// qualquer parte do template que as usa é automaticamente re-renderizada.
// ==========================================================================

// Array de séries carregadas da API
// Começa vazio e é preenchido no onMounted
const series = ref([])

// Controle de estados da UI
const carregando = ref(false)  // true enquanto busca dados da API
const erro = ref(null)         // mensagem de erro, null se sem erro

// Estado dos filtros
// Strings que representam o filtro selecionado pelo usuário
const filtroGenero = ref('')       // '' = todos os gêneros
const filtroStatus = ref('todas')  // 'todas', 'assistida', 'pendente'

// ==========================================================================
// PROPRIEDADES COMPUTADAS (computed)
//
// computed() cria um valor que é AUTOMATICAMENTE recalculado quando
// qualquer variável reativa usada dentro dele muda.
//
// Exemplo: quando filtroGenero muda, seriesFiltradas recalcula sozinho
// e o template é atualizado sem precisar chamar nenhuma função manualmente.
// ==========================================================================

/**
 * generosUnicos — extrai lista de gêneros únicos das séries
 *
 * Usa:
 * - .map() para extrair o campo "genero" de cada série
 * - new Set() para remover duplicatas
 * - [...] spread para converter o Set de volta em array
 * - .sort() para ordenar alfabeticamente
 *
 * Recalcula automaticamente quando o array 'series' muda.
 */
const generosUnicos = computed(() => {
  // Extrai gêneros únicos e ordena alfabeticamente
  const generos = series.value.map(s => s.genero)
  return [...new Set(generos)].sort()
})

/**
 * seriesFiltradas — aplica os filtros de gênero e status sobre as séries
 *
 * Esta é a computed property principal usada pelo template para
 * renderizar o grid de cards. Ela:
 *
 * 1. Começa com TODAS as séries
 * 2. Filtra por gênero (se um gênero específico foi selecionado)
 * 3. Filtra por status (se não é 'todas')
 *
 * REATIVIDADE: como usa series, filtroGenero e filtroStatus (todos reativos),
 * recalcula automaticamente quando QUALQUER um deles muda.
 * Isso faz o filtro funcionar SEM recarregar a página — é reatividade pura.
 */
const seriesFiltradas = computed(() => {
  // Começa com todas as séries
  let resultado = series.value

  // Se um gênero específico foi selecionado, filtra
  // .filter() retorna um novo array apenas com os itens que passam no teste
  if (filtroGenero.value) {
    resultado = resultado.filter(serie => serie.genero === filtroGenero.value)
  }

  // Filtra por status de assistida
  if (filtroStatus.value === 'assistida') {
    resultado = resultado.filter(serie => serie.assistida === true)
  } else if (filtroStatus.value === 'pendente') {
    resultado = resultado.filter(serie => serie.assistida === false)
  }
  // Se filtroStatus === 'todas', não filtra (retorna tudo)

  return resultado
})

/**
 * totalAssistidas / totalPendentes — contadores para as estatísticas
 * Usam .filter().length para contar séries por status.
 */
const totalAssistidas = computed(() => {
  return series.value.filter(s => s.assistida).length
})

const totalPendentes = computed(() => {
  return series.value.filter(s => !s.assistida).length
})

// ==========================================================================
// FUNÇÕES
// ==========================================================================

/**
 * carregarSeries — busca todas as séries da API via GET
 *
 * Usa fetch() para fazer uma requisição HTTP GET ao JSON Server.
 * O resultado é convertido de JSON para um array JavaScript
 * e armazenado na variável reativa 'series'.
 *
 * Como 'series' é reativo, ao atualizar seu valor, todos os
 * computed e o template são automaticamente atualizados.
 *
 * async/await: permite escrever código assíncrono de forma legível.
 * O await "espera" a resposta da API antes de continuar.
 */
async function carregarSeries() {
  carregando.value = true  // Ativa indicador de carregamento
  erro.value = null        // Limpa erros anteriores

  try {
    // fetch() faz uma requisição HTTP GET para a URL da API
    const resposta = await fetch(API_URL)

    // Verifica se a resposta foi bem-sucedida (status 200-299)
    if (!resposta.ok) {
      throw new Error('Erro ao carregar as séries da API')
    }

    // .json() converte o corpo da resposta de JSON para objeto JavaScript
    const dados = await resposta.json()

    // Atualiza o array reativo com os dados da API
    // Isso dispara a reatividade: o template re-renderiza automaticamente
    series.value = dados

  } catch (e) {
    // Se a requisição falhar (ex: API offline), armazena a mensagem de erro
    erro.value = 'Não foi possível carregar as séries. Verifique se o JSON Server está rodando.'
    console.error('Erro ao carregar séries:', e)
  } finally {
    // Desativa o indicador de carregamento, independente de sucesso ou erro
    carregando.value = false
  }
}

/**
 * removerSerie — remove uma série do catálogo
 *
 * Esta função é chamada quando o SerieCard emite o evento 'remover'.
 * Ela:
 * 1. Faz uma requisição DELETE à API para remover a série no backend
 * 2. Remove a série do array reativo local
 *
 * A remoção do array local faz a série sumir da tela IMEDIATAMENTE
 * sem recarregar a página — isso é reatividade do Vue.
 *
 * @param {number} id — ID da série a ser removida (recebido via emit)
 */
async function removerSerie(id) {
  try {
    // DELETE /series/:id — remove a série no JSON Server
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'  // Método HTTP DELETE
    })

    // Verifica se a remoção foi bem-sucedida
    if (!resposta.ok) {
      throw new Error('Erro ao remover a série')
    }

    // Remove a série do array reativo local
    // .filter() cria um NOVO array sem a série removida
    // Ao atualizar series.value, o Vue detecta a mudança e
    // re-renderiza o grid automaticamente (reatividade)
    series.value = series.value.filter(serie => serie.id !== id)

  } catch (e) {
    // Se falhar, mostra alerta para o usuário
    alert('Erro ao remover a série. Tente novamente.')
    console.error('Erro ao remover série:', e)
  }
}

/**
 * limparFiltros — reseta todos os filtros para o estado padrão
 * Chamada quando o usuário clica em "Limpar filtros" na mensagem de lista vazia.
 */
function limparFiltros() {
  filtroGenero.value = ''
  filtroStatus.value = 'todas'
}

// ==========================================================================
// LIFECYCLE HOOK — onMounted
//
// onMounted é executado UMA VEZ quando o componente é inserido no DOM.
// Usamos para carregar as séries da API automaticamente ao abrir a página.
// Isso atende ao requisito: "séries carregadas da API ao abrir a aplicação".
// ==========================================================================
onMounted(() => {
  carregarSeries()
})
</script>

<style scoped>
/* ==========================================================================
   ESTILOS DA HOME VIEW
   ========================================================================== */

.home-view {
  padding-bottom: 40px;
}

/* --------------------------------------------------------------------------
   CABEÇALHO DA PÁGINA
   Título + Estatísticas lado a lado.
   -------------------------------------------------------------------------- */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
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

/* Estatísticas rápidas (assistidas / pendentes) */
.page-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 800;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

/* --------------------------------------------------------------------------
   GRID DE SÉRIES
   Layout em grade responsivo usando CSS Grid.
   - auto-fill: cria quantas colunas couberem
   - minmax(300px, 1fr): cada coluna tem mínimo 300px, máximo flexível
   Isso torna o layout automaticamente responsivo.
   -------------------------------------------------------------------------- */
.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* --------------------------------------------------------------------------
   ESTADO DE CARREGAMENTO
   Spinner animado com CSS puro (sem dependências externas).
   -------------------------------------------------------------------------- */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 20px;
}

/* Spinner: anel que gira com animação CSS */
.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid var(--bg-tertiary);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

/* --------------------------------------------------------------------------
   ESTADO DE ERRO
   -------------------------------------------------------------------------- */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  gap: 16px;
}

.error-icon {
  font-size: 3rem;
}

.error-message {
  color: var(--text-secondary);
  text-align: center;
  max-width: 400px;
}

/* --------------------------------------------------------------------------
   ESTADO DE LISTA VAZIA
   -------------------------------------------------------------------------- */
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  gap: 16px;
}

.empty-icon {
  font-size: 3rem;
}

.empty-message {
  color: var(--text-secondary);
  text-align: center;
}

/* --------------------------------------------------------------------------
   RESPONSIVIDADE
   -------------------------------------------------------------------------- */
@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .series-grid {
    grid-template-columns: 1fr;
  }
}
</style>

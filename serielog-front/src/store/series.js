import { ref } from 'vue'

// esse array não "reseta" quando a rota for trocada pois ele fica fora dos componentes
export const series = ref([])

const API_URL = 'http://localhost:3000/series'

export async  function carregarSeries(){
    const resposta = await fetch(API_URL)
    if(!resposta.ok){
        throw new Error('Erro ao carregar as séries da API')
    }
    series.value = await resposta.json()
}

export async function adicionarSerie(dados){
    const resposta = await fetch(API_URL,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    if(!resposta.ok){
        throw new Error('Erro ao cadastrar a série')
    }
    const novaSerie = await resposta.json()
    series.value.push(novaSerie)
}

export async function removerSerie(id){
    const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!resposta.ok) {
        throw new Error('Erro ao remover a série')
    }
    series.value = series.value.filter(serie => serie.id !== id)
}
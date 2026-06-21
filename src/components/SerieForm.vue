<template>
    <form class="serie-form" @submit.prevent="enviarFormulario">

        <div class="form-group">
            <label for="titulo">Título</label>
            <input
                id="titulo"
                type="text"
                v-model="titulo"
                required
            />
        </div>

        <div class="form-group">
            <label for="genero">Gênero</label>
            <input
                id="genero"
                type="text"
                v-model="genero"
                required
            />
        </div>

        <div class="form-group">
            <label for="nota">Nota</label>
            <input
                id="nota"
                type="number"
                step="0.1"
                min="0"
                max="10"
                v-model.number="nota"
                required
            />
        </div>

        <div class="form-group">
            <label for="ano">Ano</label>
            <input
                id="ano"
                type="number"
                v-model.number="ano"
                required
            />
        </div>

        <div class="form-group form-checkbox">
            <label for="assistida">Já assisti</label>
            <input
                id="assistida"
                type="checkbox"
                v-model="assistida"
            />
        </div>

        <button type="submit" class="btn btn-primary">Salvar Série</button>

    </form>
</template>

<script setup>
import { ref } from 'vue'

const titulo = ref('')
const genero = ref('')
const nota = ref(0)
const ano = ref('') 
const assistida = ref(false)

const emit = defineEmits(['salvar'])

function enviarFormulario(){
    emit('salvar', {
        titulo: titulo.value,
        genero: genero.value,
        nota: nota.value,
        ano: ano.value,
        assistida: assistida.value
    })
}
</script>

<style scoped>
.serie-form{
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 32px;
}

.form-group{
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-group label{
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
}

.form-group input{
    padding: 10px 14px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
}

.form-checkbox{
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.form-checkbox input{
    width: auto;
}
</style>
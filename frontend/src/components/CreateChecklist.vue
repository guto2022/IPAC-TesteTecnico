<script setup lang="ts">
    import { ref } from "vue";

    const description = ref("");
    const isSaved = ref("não salvo")

</script>

<template>
    <main class="flex justify-center mt-16">

        <div class="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

            <h2 class="text-3xl font-bold mb-6">
                Criar Checklist
            </h2>

            <label class="block mb-2 font-medium">
                Nome
            </label>

            <input
                v-model="description"
                placeholder="Digite o nome"
                class="w-full border rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

            <label class="block mb-2 font-medium">
                Descrição
            </label>

            <input
                v-model="description"
                placeholder="Digite a descrição"
                class="w-full border rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

            <button
                class="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-md transition"
            >
                Salvar
            </button>

        </div>

    </main>
</template>
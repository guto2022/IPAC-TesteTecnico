<script setup lang="ts">
    import { ref } from "vue";
    import api from "../api/api";

    const description = ref<string>("");
    const message = ref<string>("");
    const isSaved = ref<boolean | null>(null);

    const clearMessage = () => {
        setTimeout(() => {
            message.value = "";
            isSaved.value = null;
        }, 3000);
    }

    const showMessage = (messageText: string, success: boolean) => {
        message.value = messageText;
        isSaved.value = success;

        clearMessage();
    }

    const createItem = async () => {
        try{
            if (description.value.trim() === "") {
                showMessage("Digite uma descrição.", false);
                return;
            }

            await api.post("/items", {
                description: description.value
            });

            showMessage("Item salvo com sucesso!", true);
            description.value = "";

        } catch(error) {
            showMessage("Erro ao salvar o item. Por favor, tente novamente.", false);
            console.error(error)
        }
    }

</script>

<template>
    <main class="flex justify-center mt-8">

        <div class="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

            <h2 class="text-3xl font-bold mb-6">
                Criar Item
            </h2>

            <label class="block mb-2 font-medium">
                Descrição
            </label>

            <input
                v-model="description"
                placeholder="Digite a descrição"
                class="w-full border rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

            <button
                @click="createItem"
                class="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-md transition"
            >
                Salvar
            </button>
            
            <p 
                v-if="isSaved !== null"
                class="flex justify-center mt-4"
                :class="{
                    'text-green-600': isSaved,
                    'text-red-600': !isSaved
                }"
            >
                {{ message }}
            </p>

        </div>

    </main>
</template>
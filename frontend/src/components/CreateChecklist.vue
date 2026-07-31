<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import api from "../api/api";

    interface Item {
        id: number;
        description: string;
    }

    const name = ref<string>("");
    const description = ref<string | null>(null);
    const status = ref<"PRONTO" | "RASCUNHO" | null>(null);
    const selectedItems = ref<number[]>([]);

    const message = ref<string>("")
    const isSaved = ref<boolean | null>(null)

    const items = ref<Item[]>([]);

    const toggleItem = (item: number) => {
        if (!selectedItems.value.includes(item)) {
            selectedItems.value.push(item)

        } else if (selectedItems.value.includes(item)){
            const index = selectedItems.value.indexOf(item)
            selectedItems.value.splice(index, 1)
        }
    };

    const clearMessage = () => {
        setTimeout(() => {
            message.value = "";
            isSaved.value = null;
        }, 3000);
    };

    const showMessage = (messageText: string, success: boolean) => {
        message.value = messageText;
        isSaved.value = success;

        clearMessage();
    };

    const loadItems = async () => {
        try {
            const response = await api.get("/items");
            items.value = response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const createChecklist = async () => {
        try {
            if (name.value.trim() === ""){
                showMessage("Digite um nome.", false);
                return;
            }

            
            if (description.value?.trim() === ""){
                description.value = null;
                return;
            }

            if (status.value === null){
                showMessage("Selecione um status.", false);
                return;
            }

            if (selectedItems.value.length === 0){
                showMessage("Selecione pelo menos um item.", false);
                return;
            }

            await api.post("checklists", {  
                name: name.value,
                description: description.value,
                status: status.value,
                itemIds: selectedItems.value
            })

            showMessage("Checklist salvo com sucesso!", true);
            name.value = "";
            description.value = null;
            status.value = null;
            selectedItems.value = [];

        } catch (error) {
            showMessage("Erro ao salvar o checklist. Por favor, tente novamente.", false);
            console.error(error);
        }
    };

    onMounted(loadItems);
</script>

<template>
    <main class="flex justify-center mt-8">

        <div class="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

            <h2 class="text-3xl font-bold mb-6">
                Criar Checklist
            </h2>

            <label class="block mb-2 font-medium">
                Nome
            </label>

            <input
                v-model="name"
                placeholder="Digite o nome"
                class="w-full border rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

            <label class="block mb-2 font-medium">
                Descrição
            </label>

            <input
                v-model="description"
                placeholder="Digite a descrição (opcional)"
                class="w-full border rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

            <label class="block mb-2 font-medium">
                Status
            </label>

            <div class="flex gap-3 mb-6">
                <button
                    @click="
                        status = 'PRONTO';
                    "
                    class="px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
                    :class="{
                        'bg-green-600 text-white': status === 'PRONTO',
                        'bg-gray-200 hover:bg-gray-300 text-gray-700': status !== 'PRONTO'
                    }"
                >
                    Pronto
                </button>

                <button
                    @click="
                        status = 'RASCUNHO';
                    "
                    class="px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
                    :class="{
                        'bg-yellow-600 text-white': status === 'RASCUNHO',
                        'bg-gray-200 hover:bg-gray-300 text-gray-700': status !== 'RASCUNHO'
                    }"
                >
                    Rascunho
                </button>
            </div>

            <label class="block mb-2 font-medium">
                Itens
            </label>

            <div class="my-2">
                <div
                    v-if="items.length === 0"
                    class="text-center text-gray-500 py-10 border rounded-lg"
                >
                    Nenhum item cadastrado.
                </div>

                <div
                    v-if="items.length > 0"
                    v-for="item in items"
                    :key="item.id"
                    class="flex items-center justify-between bg-slate-50 border-2 rounded-xl px-5 py-2 mb-4 hover:shadow-md transition cursor-pointer"
                    @click="toggleItem(item.id)"
                    :class="{
                        'border-green-600 hover:border-green-600': selectedItems.includes(item.id),
                        'border-slate-200 hover:border-blue-300': !selectedItems.includes(item.id)
                    }"
                >
                    <div>

                        <p class="text-xs text-slate-500 mb-1">
                            Item {{ item.id }}
                        </p>

                        <h3 class="text-lg font-medium text-slate-800">
                            {{ item.description }}
                        </h3>

                    </div>
                </div>
            </div>
            

            <button
                @click="createChecklist"
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
<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import api from "../api/api";

    interface Item {
        id: number;
        description: string;
    }

    const items = ref<Item[]>([]);

    const isLoading = ref<boolean>(true)

    const loadItems = async () => {
        try {
            const response = await api.get("/items");
            items.value = response.data;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(loadItems);
</script>

<template>
    <main class="flex justify-center mt-8">
        <div class="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">

            <h2 class="text-3xl font-bold mb-8">
                Ver Itens
            </h2>

            <div
                v-if="isLoading"
                class="text-center text-gray-500 py-10 border rounded-lg"
            >
                Carregando...
            </div>

            <div
                v-else-if="items.length === 0"
                class="text-center text-gray-500 py-10 border rounded-lg"
            >
                Nenhum item cadastrado.
            </div>

            <div
                v-if="items.length > 0"
                v-for="item in items"
                :key="item.id"
                class="flex items-center justify-between bg-slate-50 border-2 border-slate-200 rounded-xl p-5 mb-4 hover:shadow-md hover:border-blue-300 transition"
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
    </main>
</template>
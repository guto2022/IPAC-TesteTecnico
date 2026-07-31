<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import api from "../api/api";

    const openedChecklist = ref<number | null>(null);

    const statusFilter = ref<"PRONTO" | "RASCUNHO">("PRONTO");

    const isLoading = ref<boolean>(true)

    interface Item {
        id: number;
        description: string;
    }

    interface ChecklistItem {
        checklistId: number;
        itemId: number;
        status: "CONFORME" | "NAO_CONFORME" | null;
        item: Item;
    }

    interface Checklist {
        id: number;
        name: string;
        description: string;
        status: "PRONTO" | "RASCUNHO";
        checklistItems: ChecklistItem[];
    }

    const checklists = ref<Checklist[]>([]);

    const loadChecklists = async () => {
        try {
            const response = await api.get("/checklists", {
                params: {
                    status:
                        statusFilter.value
                },
            });

            checklists.value = response.data;
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    const toggleItemStatus = (
        checklistItem: ChecklistItem,
        status: "CONFORME" | "NAO_CONFORME"
    ) => {
        checklistItem.status = checklistItem.status === status ? null : status 
    };

    onMounted(loadChecklists);
</script>

<template>
    <main class="flex justify-center mt-8">
        <div class="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
            <div class="flex justify-between items-center mb-6">

                <h2 class="text-3xl font-bold">
                    Ver Checklists
                </h2>

                <div class="flex gap-3">
                    <button
                        @click="
                            statusFilter = 'PRONTO';
                            loadChecklists();
                        "
                        class="px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
                        :class="{
                            'bg-green-600 text-white': statusFilter === 'PRONTO',
                            'bg-gray-200 hover:bg-gray-300 text-gray-700': statusFilter !== 'PRONTO'
                        }"
                    >
                        Prontos
                    </button>

                    <button
                        @click="
                            statusFilter = 'RASCUNHO';
                            loadChecklists();
                        "
                        class="px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
                        :class="{
                            'bg-yellow-500 text-white': statusFilter === 'RASCUNHO',
                            'bg-gray-200 hover:bg-gray-300 text-gray-700': statusFilter !== 'RASCUNHO'
                        }"
                    >
                        Rascunhos
                    </button>
                </div>
            </div>

            <div
                v-if="isLoading"
                class="text-center text-gray-500 py-10 border rounded-lg"
            >
                Carregando...
            </div>

            <div
                v-else-if="checklists.length === 0"
                class="text-center text-gray-500 py-10 border rounded-lg"
            >
                Nenhum checklist cadastrado.
            </div>

            <div
                v-for="checklist in checklists"
                :key="checklist.id"
                class="bg-slate-50 border-2 border-slate-200 rounded-xl p-5 mb-4 hover:shadow-md hover:border-blue-300 transition cursor-pointer"
                @click="
                    openedChecklist =
                        openedChecklist === checklist.id
                            ? null
                            : checklist.id
                "
            >
                <div class="flex justify-between items-center">
                    <div>

                        <h3 class="text-xl font-bold">
                            {{ checklist.name }}
                        </h3>

                        <p class="text-gray-600">
                            {{ checklist.description }}
                        </p>

                    </div>

                    <span
                        class="text-sm font-semibold"
                        :class="{
                            'text-green-600': checklist.status === 'PRONTO',
                            'text-yellow-600': checklist.status === 'RASCUNHO'
                        }"
                    >
                        {{ checklist.status }}
                    </span>

                </div>
                <div
                    v-if="openedChecklist === checklist.id"
                    class="mt-5 border-t pt-4"
                >

                    <h4 class="font-semibold mb-3">
                        Itens
                    </h4>

                    <div
                        v-for="checklistItem in checklist.checklistItems"
                        :key="checklistItem.itemId"
                        class="flex items-center justify-between bg-slate-50 border-2 border-slate-200 rounded-xl p-5 mb-4 hover:shadow-md hover:border-blue-300 transition"
                    >

                        <h3 class="text-lg font-medium text-slate-800">
                            {{ checklistItem.item.description }}
                        </h3>

                        <div class="flex gap-2">
                            <button
                                @click.stop="
                                    toggleItemStatus(checklistItem, 'CONFORME')
                                "
                                class="px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
                                :class="{
                                    'bg-green-600 text-white': checklistItem.status === 'CONFORME',
                                    'bg-gray-200 hover:bg-gray-300 text-gray-700': checklistItem.status !== 'CONFORME'
                                }"
                            >
                                Conforme
                            </button>

                            <button
                                @click.stop="
                                    toggleItemStatus(checklistItem, 'NAO_CONFORME')
                                "
                                class="px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
                                :class="{
                                    'bg-red-600 text-white': checklistItem.status === 'NAO_CONFORME',
                                    'bg-gray-200 hover:bg-gray-300 text-gray-700': checklistItem.status !== 'NAO_CONFORME'
                                }"
                            >
                                Não conforme
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
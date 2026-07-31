<script setup lang="ts">
    import { ref } from "vue";
    import CreateItem from "../components/CreateItem.vue";
    import CreateChecklist from "../components/CreateChecklist.vue"

    const selectedForm = ref("item");

</script>

<template>
    <main class="text-black">
        <div class="mx-auto h-16 flex items-center justify-center">
            
            <!-- Botões -->
            <div class="flex items-center gap-20">
                <button 
                    @click="selectedForm = 'item'"
                    class="px-4 py-2 rounded-md text-xl font-medium cursor-pointer transition"
                    :class="{
                        'bg-blue-600 hover:bg-blue-500 text-white shadow-sm': selectedForm === 'item',
                        'bg-slate-900 text-white hover:text-blue-500': selectedForm !== 'item'
                    }"
                >
                    Criar um item
                </button>

                <button 
                    @click="selectedForm = 'checklist'"
                    class="px-4 py-2 rounded-md text-xl font-medium cursor-pointer transition"
                    :class="{
                        'bg-blue-600 hover:bg-blue-500 text-white shadow-sm': selectedForm === 'checklist',
                        'bg-slate-900 text-white hover:text-blue-500': selectedForm !== 'checklist',
                    }"
                >
                    Criar checklist
                </button>
            </div>
        </div>
        <CreateItem v-if="selectedForm === 'item'"/>
        <CreateChecklist v-if="selectedForm === 'checklist'"/>
    </main>
</template>
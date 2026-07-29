<script setup lang="ts">
    import { ref } from "vue";
    import ViewItems from "../components/ViewItems.vue";
    import ViewChecklists from "../components/ViewChecklists.vue";

    const selectedForm = ref("checklist");

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
                    Ver os itens
                </button>
                <button 
                    @click="selectedForm = 'checklist'"
                    class="px-4 py-2 rounded-md text-xl font-medium cursor-pointer transition"
                    :class="{
                        'bg-blue-600 hover:bg-blue-500 text-white shadow-sm': selectedForm === 'checklist',
                        'bg-slate-900 text-white hover:text-blue-500': selectedForm !== 'checklist',
                    }"
                >
                    Ver checklists
                </button>
            </div>
        </div>
        <ViewItems v-if="selectedForm === 'item'"/>
        <ViewChecklists v-else/>
    </main>
</template>
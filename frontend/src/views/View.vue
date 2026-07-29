<script setup lang="ts">
    import { ref } from "vue";

    const selectedForm = ref("item");

</script>

<template>
    <main class="text-black">
        <div class="mx-auto h-16 flex items-center justify-center">
            
            <!-- Botões -->
            <div class="flex items-center gap-20">
                <button 
                    @click="selectedForm = 'checklist'"
                    class="px-4 py-2 rounded-md text-2xl font-medium cursor-pointer transition"
                    :class="{
                        'bg-blue-600 hover:bg-blue-500 text-white shadow-sm': selectedForm === 'checklist',
                        'bg-slate-900 text-white hover:text-blue-500': selectedForm !== 'checklist',
                    }"
                >
                    Checklist
                </button>
                <button 
                    @click="selectedForm = 'item'"
                    class="px-4 py-2 rounded-md text-2xl font-medium cursor-pointer transition"
                    :class="{
                        'bg-blue-600 hover:bg-blue-500 text-white shadow-sm': selectedForm === 'item',
                        'bg-slate-900 text-white hover:text-blue-500': selectedForm !== 'item'
                    }"
                >
                    Item
                </button>
            </div>
        </div>
        <p>Ver {{ selectedForm }}</p>
    </main>
</template>
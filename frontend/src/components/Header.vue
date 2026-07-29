<script setup lang="ts">
    defineProps({
        page: String
    })

    const emit = defineEmits(["changePage"]);
</script>

<template>
    <header class="bg-slate-900 text-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <!-- Título -->
            <a href="https://www.ipacsiosi.com.br/" target=_blank class="text-xl font-bold tracking-tight cursor-pointer">
                IPAC Teste técnico
            </a>

            <!-- Botões -->
            <div class="flex items-center gap-3">
                <button 
                    @click="emit('changePage', 'view')" 
                    class="px-4 py-2 text-md font-medium cursor-pointer transition"
                    :class="{
                        'bg-blue-600 hover:bg-blue-500 rounded-md shadow-sm': page === 'view',
                        'text-white hover:text-blue-500': page !== 'view'
                    }"
                >
                    Ver
                </button>
                <button 
                    @click="emit('changePage', 'create')" 
                    class="px-4 py-2 text-md font-medium cursor-pointer transition"
                    :class="{
                        'bg-blue-600 hover:bg-blue-500 rounded-md shadow-sm': page === 'create',
                        'text-white hover:text-blue-500': page !== 'create',
                    }"
                >
                    Criar
                </button>
            </div>
        </div>
    </header>
</template>
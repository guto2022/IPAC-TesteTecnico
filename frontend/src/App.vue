<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/Header.vue";
import Create from "./views/Create.vue"
import View from "./views/View.vue"

const page = ref("view");
</script>

<template>
  <Header
    :page="page" 
    @changePage="page = $event"
  />

  <main class="p-6">
    <div v-if="page === 'create'">
      <Create />
    </div>

    <div v-if="page === 'view'">
      <View />
    </div>
  </main>
</template>
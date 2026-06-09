<template>
  <div class="min-h-screen bg-black text-white flex flex-col">
    <TheHeader />

    <main
      :class="[route.path === '/' ? 'pt-0' : 'pt-[164px]']"
      class="flex-grow"
    >
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

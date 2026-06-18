<template>
  <div class="min-h-screen text-white flex flex-col">
    <HeaderTop />
    <HeaderMain class="sticky top-0 z-50" />
    <HeaderCategories />

    <main class="flex-grow">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

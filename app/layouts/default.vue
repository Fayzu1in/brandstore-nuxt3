<template>
  <div class="min-h-screen text-white flex flex-col bg-[#12161D]">
    <!-- Скрываем HeaderTop из DOM, когда открыто мега-меню -->
    <HeaderTop v-if="!isMenuOpen" />

    <!-- Главный хедер и категории липнут к верху -->
    <div class="sticky top-0 z-50 w-full bg-[#12161D]">
      <HeaderMain
        :is-menu-open="isMenuOpen"
        @toggle-menu="isMenuOpen = !isMenuOpen"
      />
      <HeaderCategories />
    </div>

    <main class="flex-grow">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const isMenuOpen = ref(false);
const route = useRoute();

// Автоматически закрываем меню при переходе на любую другую страницу
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  },
);
</script>

<script setup>
import { useCategoryStore } from "~/stores/useCategoryStore";
import { ref, onMounted } from "vue";

const isInitialLoading = ref(true);
const categoryStore = useCategoryStore();
await useAsyncData("categories-init", () => categoryStore.fetchCategories());

onMounted(() => {
  setTimeout(() => {
    isInitialLoading.value = false;
  }, 400);
});
</script>
<template>
  <div>
    <NuxtLoadingIndicator color="#E30909" :height="3" />
    <PageLoader :show="isInitialLoading" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

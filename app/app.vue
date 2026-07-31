<template>
  <div>
    <NuxtLoadingIndicator color="#E30909" :height="3" />
    <PageLoader :show="isInitialLoading" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const isInitialLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isInitialLoading.value = false;
  }, 400);
});
</script>

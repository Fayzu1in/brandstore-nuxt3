<template>
  <div class="min-h-screen bg-[#0e1217] text-white py-4">
    <ProductSection
      :title="sectionTitle"
      :items="products"
      :loading="isLoading"
      :skeleton-count="10"
      @load-more="handleLoadMore"
    />

    <!-- Если ничего не найдено -->
    <div
      v-if="!isLoading && searchQuery && !products.length"
      class="bg-[#1c2229] rounded-2xl p-12 text-center border border-white/5 my-8 max-w-lg mx-auto"
    >
      <Icon
        name="mdi:magnify-remove-outline"
        class="text-6xl text-gray-500 mx-auto mb-4"
      />
      <h2 class="text-xl font-bold mb-2">Ничего не найдено</h2>
      <p class="text-gray-400 text-sm">
        По запросу «<span class="text-white">{{ searchQuery }}</span
        >» ничего не удалось найти.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "~/utils/api";

const route = useRoute();

const products = ref([]);
const totalCount = ref(0);
const isLoading = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);

const searchQuery = computed(() => (route.query.q || "").toString().trim());

const sectionTitle = computed(() => {
  if (!searchQuery.value) return "Поиск товаров";
  return `Результаты поиска: «${searchQuery.value}» ${
    totalCount.value ? `(${totalCount.value})` : ""
  }`;
});

const fetchProducts = async (page = 1) => {
  if (!searchQuery.value) {
    products.value = [];
    totalCount.value = 0;
    return;
  }

  if (page === 1) {
    products.value = [];
    totalCount.value = 0;
  }

  isLoading.value = true;
  try {
    const res = await api.searchProducts(searchQuery.value, page);

    const allProducts = res?.products || res?.data?.products || res?.data || [];
    const meta = res?.meta || res?.data?.meta || {};

    if (page === 1) {
      products.value = Array.isArray(allProducts) ? allProducts : [];
    } else {
      products.value.push(...(Array.isArray(allProducts) ? allProducts : []));
    }

    totalCount.value = meta?.total || products.value.length;
    currentPage.value = meta?.current_page || page;
    lastPage.value = meta?.last_page || page;
  } catch (e) {
    console.error("Ошибка при поиске:", e);
    if (page === 1) products.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Триггер для Infinity Scroll (вызывается из ProductSection)
const handleLoadMore = () => {
  if (currentPage.value < lastPage.value && !isLoading.value) {
    fetchProducts(currentPage.value + 1);
  }
};

// Сброс и запуск поиска при смене URL
watch(
  () => route.query.q,
  () => {
    currentPage.value = 1;
    fetchProducts(1);
  },
);

onMounted(() => {
  fetchProducts(1);
});

useHead({
  title: computed(() =>
    searchQuery.value ? `Поиск: ${searchQuery.value}` : "Поиск",
  ),
});
</script>

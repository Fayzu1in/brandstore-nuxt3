<script setup>
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Вычисляем динамический заголовок в зависимости от параметров в URL
const pageTitle = computed(() => {
  if (route.query.discount) return "Горящие предложения";
  if (route.query.type === "recommended") return "Рекомендуемые товары";
  return "Подборка товаров";
});

// Собираем параметры из URL для передачи в API
const queryParams = computed(() => ({
  ...route.query,
}));

// Подключаем тот же Composable
const {
  items: products,
  loading,
  isInitialLoading,
  hasMorePages,
  error,
  loadMore,
  reset, // Добавь метод сброса в composable, если сменяются query-параметры
} = useDataLoader({
  params: queryParams,
  perPage: 15,
});

// Запускаем первичную загрузку
onMounted(() => {
  loadMore();
});

// Если пользователь переключился между подборками без перезагрузки страницы
watch(
  () => route.query,
  () => {
    if (typeof reset === "function") reset();
    loadMore();
  },
);
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-4 py-8">
    <!-- Первичная загрузка -->
    <div v-if="isInitialLoading" class="py-16 text-center text-gray-400">
      Загрузка товаров...
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="py-16 text-center text-red-500">
      {{ error }}
    </div>

    <template v-else>
      <!-- Основная сетка товаров -->
      <ProductSection
        v-if="products.length"
        :title="pageTitle"
        :items="products"
        :loading="loading"
        @load-more="loadMore"
      />

      <div
        v-else
        class="py-16 text-center text-gray-400 bg-[#1b233d]/30 rounded-2xl border border-white/5"
      >
        В данной подборке пока нет товаров.
      </div>

      <!-- Спиннер подгрузки новых страниц -->
      <div
        v-if="loading && !isInitialLoading"
        class="py-6 flex items-center justify-center gap-2 text-sm text-gray-400"
      >
        <span
          class="w-5 h-5 border-2 border-[#E30909] border-t-transparent rounded-full animate-spin"
        ></span>
        Загрузка следующих товаров...
      </div>
    </template>
  </div>
</template>

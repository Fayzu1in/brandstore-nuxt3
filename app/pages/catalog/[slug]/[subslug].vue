<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "~/stores/useCategoryStore";

const route = useRoute();
const categoryStore = useCategoryStore();

// Параметры URL (/catalog/[slug]/[subslug])
const categorySlug = computed(() => route.params.slug as string);
const subcategorySlug = computed(() => route.params.subslug as string);

// 1. Находим родительскую категорию из стора
const currentCategory = computed(() => {
  return categoryStore.getCategoryBySlug(categorySlug.value);
});

// 2. Ищем подкатегорию внутри childs родительской категории
const currentSubcategory = computed(() => {
  if (!currentCategory.value?.childs) return null;
  return currentCategory.value.childs.find(
    (sub) => sub.slug === subcategorySlug.value,
  );
});

// Название страницы (используем .name из бэкенда)
const pageTitle = computed(() => currentSubcategory.value?.name || "Товары");

// Параметры для API подгрузки товаров (category_id передается в composable)
const queryParams = computed(() => ({
  category_id: currentSubcategory.value?.id,
}));

// Подключаем Composable
const {
  items: products,
  loading,
  isInitialLoading,
  hasMorePages,
  error,
  loadMore,
} = useDataLoader({
  params: queryParams,
  perPage: 15,
});

// Запускаем первую загрузку
onMounted(() => {
  loadMore();
});

const handleRetry = () => {
  if (typeof reload === "function") {
    reload();
  } else {
    window.location.reload();
  }
};
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-4 py-8">
    <!-- <AppBreadcrumbs :items="[{ label: pageTitle }]" /> -->

    <!-- Ошибка -->
    <AppErrorState
      v-if="error"
      title="Не удалось загрузить данные"
      description="Что-то пошло не так при загрузке каталога. Проверьте подключение или повторите попытку."
      @retry="handleRetry"
    />

    <!-- Секция товаров с поддержкой скелетона -->
    <ProductSection
      v-else
      :title="pageTitle"
      :items="products"
      :loading="isInitialLoading || loading"
      @load-more="loadMore"
    />
  </div>
</template>

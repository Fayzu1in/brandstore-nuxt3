<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { CATALOG_MOCK_DATA } from "~/data/catalog";

const route = useRoute();

// Параметры URL
const categorySlug = computed(() => route.params.slug);
const subcategorySlug = computed(() => route.params.subslug);

// Находим данные подкатегории
const currentSubcategory = computed(() => {
  const category = CATALOG_MOCK_DATA[categorySlug.value];
  if (!category?.subcategories) return null;
  return category.subcategories.find(
    (sub) => sub.slug === subcategorySlug.value,
  );
});

const pageTitle = computed(() => currentSubcategory.value?.title || "Товары");

// Параметры для API (автоматически передаются в composable)
const queryParams = computed(() => ({
  category_id: currentSubcategory.value?.id,
}));

// Подключаем наш Composable
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

<!-- В файле personal.vue или [subslug].vue -->
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

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
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-4 py-8">
    <!-- Хлебные крошки -->
    <nav
      class="flex items-center gap-2 text-xs md:text-sm font-bold tracking-wide uppercase mb-6 text-gray-400"
    >
      <NuxtLink to="/" class="hover:text-white transition-colors"
        >Главная</NuxtLink
      >
      <span>→</span>
      <NuxtLink
        :to="`/catalog/${categorySlug}`"
        class="hover:text-white transition-colors"
      >
        {{ categorySlug }}
      </NuxtLink>
      <span>→</span>
      <span class="text-[#E30909]">{{ pageTitle }}</span>
    </nav>

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
        В данной категории пока нет товаров.
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

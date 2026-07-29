<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "~/utils/api";
import { CATALOG_MOCK_DATA } from "~/data/catalog";

const route = useRoute();

// Получаем параметры из URL
const categorySlug = computed(() => route.params.slug);
const subcategorySlug = computed(() => route.params.subslug);

const products = ref([]);
const meta = ref(null);
const isLoading = ref(true);
const error = ref(null);

// Находим данные подкатегории в мок-структуре, чтобы вытащить ID для API
const currentSubcategory = computed(() => {
  const category = CATALOG_MOCK_DATA[categorySlug.value];
  if (!category || !category.subcategories) return null;

  return category.subcategories.find(
    (sub) => sub.slug === subcategorySlug.value,
  );
});

const fetchProducts = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const categoryId = currentSubcategory.value?.id || 148; // По умолчанию или из мока

    const response = await api.getProducts({
      category_id: categoryId,
      page: 1,
    });

    products.value = response.data;
    meta.value = response.meta;

    console.log("Загруженные товары:", products.value);
    console.log("Пагинация:", meta.value);
  } catch (err) {
    console.error("Ошибка при загрузке товаров:", err);
    error.value = "Не удалось загрузить список товаров.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-4 py-8 text-white">
    <!-- Хлебные крошки -->
    <div class="text-sm mb-4 text-gray-400">
      <NuxtLink to="/">Главная</NuxtLink> /
      <NuxtLink :to="`/catalog/${categorySlug}`">{{ categorySlug }}</NuxtLink> /
      <span class="text-[#E30909]">{{ subcategorySlug }}</span>
    </div>

    <h1 class="text-2xl font-bold mb-6">
      Подкатегория: {{ currentSubcategory?.title || subcategorySlug }}
    </h1>

    <!-- Состояния -->
    <div v-if="isLoading" class="py-12 text-center text-gray-400">
      Загрузка товаров...
    </div>

    <div v-else-if="error" class="py-12 text-center text-red-500">
      {{ error }}
    </div>

    <div v-else class="space-y-4">
      <p class="text-sm text-gray-400">
        Найдено товаров: {{ meta?.total || products.length }}
      </p>

      <!-- Временный дамп данных для проверки работы API -->
      <div class="p-4 bg-[#1b233d] rounded-xl border border-white/10">
        <h2 class="font-bold mb-2">Список товаров из API:</h2>
        <ul class="list-disc pl-5 space-y-1">
          <li v-for="product in products" :key="product.id">
            <strong>{{ product.name }}</strong> —
            {{ product.random_shop?.price }} сум ({{ product.brand?.name }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

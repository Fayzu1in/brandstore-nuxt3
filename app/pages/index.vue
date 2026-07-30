<template>
  <div>
    <MainSlider :slides-data="banners" v-if="banners" />
    <div class="relative z-10 -mt-6 rounded-t-[25px] bg-[#13181e]">
      <ProductSection
        title="Горящие предложения"
        :items="hotProducts"
        :view-all-link="{
          path: '/catalog/personal',
          query: {
            ...(hotProductsParams?.category_id && {
              category_id: hotProductsParams.category_id,
            }),
            ...(hotProductsParams?.discount !== undefined && {
              discount: hotProductsParams.discount,
            }),
          },
        }"
        carousel
      />

      <PopularCategories :categories="categories" />
      <ProductSection title="Новинки" :items="recommendedProducts" />
      <ForyouSection :favs="categories" />
      <PromoBanner />
      <BrandsSection :brands="brands" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Запускаем все запросы ПАРАЛЛЕЛЬНО в одном useAsyncData
const { data: homeData } = await useAsyncData("home-page-data", async () => {
  const [bannersRes, categoriesRes, recommendedRes, hotProductsRes] =
    await Promise.all([
      api.getBanners(),
      api.getCategories(),
      api.getRecommendedProducts(),
      api.getHotProducts(),
    ]);

  return {
    banners: bannersRes?.data ?? [],
    categories: categoriesRes?.data ?? [],
    recommended: recommendedRes?.data?.product_request ?? [],
    // Сохраняем товары и params из ответа hotProducts
    hotProducts: hotProductsRes?.data?.product_request ?? [],
    hotProductsParams: hotProductsRes?.data?.params ?? null,
  };
});

// Доступ к данным через computed
const banners = computed(() => homeData.value?.banners ?? []);
const categories = computed(() => homeData.value?.categories ?? []);
const recommendedProducts = computed(() => homeData.value?.recommended ?? []);
const hotProducts = computed(() => homeData.value?.hotProducts ?? []);

// Формируем ссылку с динамическими query-параметрами из API
const hotProductsLink = computed(() => {
  const params = homeData.value?.hotProductsParams;

  return {
    path: "/catalog/personal",
    query: {
      ...(params?.category_id && { category_id: params.category_id }),
      ...(params?.discount !== undefined && { discount: params.discount }),
    },
  };
});
</script>

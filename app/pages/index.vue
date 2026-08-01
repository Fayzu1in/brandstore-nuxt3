<template>
  <div>
    <!-- Баннер-слайдер (принимает pending для показа шиммера) -->
    <MainSlider :slides-data="banners" :loading="pending" />

    <!-- Горящие предложения -->
    <ProductSection
      :title="ProductsName"
      :items="hotProducts"
      :loading="pending"
      :skeleton-count="5"
      :view-all-link="hotProductsLink"
      carousel
    />

    <PopularCategories :categories="categories" :loading="pending" />

    <ProductSection
      :title="recommendedName"
      :items="recommendedProducts"
      :loading="pending"
      :skeleton-count="5"
      :view-all-link="RecommendProductsLink"
      carousel
    />

    <ForyouSection :favs="categories" :loading="pending" />
    <PromoBanner />
    <BrandsSection :brands="brands" :loading="pending" />
  </div>
</template>

<
<script setup>
import { computed } from "vue";
import { api } from "~/utils/api";

const { data: homeData, pending } = useLazyAsyncData(
  "home-page-data",
  async () => {
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

      // Рекомендуемые (Новинки)
      recommended: recommendedRes?.data?.product_request ?? [],
      recommendedName: recommendedRes?.data?.name ?? "",
      recommendedParams: recommendedRes?.data?.params ?? null, // <-- Добавили сохранение params

      // Горящие предложения
      hotProducts: hotProductsRes?.data?.product_request ?? [],
      hotProductsParams: hotProductsRes?.data?.params ?? null,
      ProductsName: hotProductsRes?.data?.name ?? "",
    };
  },
);

const banners = computed(() => homeData.value?.banners ?? []);
const categories = computed(() => homeData.value?.categories ?? []);

const recommendedProducts = computed(() => homeData.value?.recommended ?? []);
const recommendedName = computed(() => homeData.value?.recommendedName ?? "");

const hotProducts = computed(() => homeData.value?.hotProducts ?? []);
const ProductsName = computed(() => homeData.value?.ProductsName ?? "");

// Ссылка на все горячие предложения
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

// Ссылка на все рекомендуемые товары
const RecommendProductsLink = computed(() => {
  const params = homeData.value?.recommendedParams; // <-- Берем из recommendedParams

  return {
    path: "/catalog/personal",
    query: {
      ...(params?.category_id && { category_id: params.category_id }),
      ...(params?.discount !== undefined && { discount: params.discount }),
    },
  };
});
</script>

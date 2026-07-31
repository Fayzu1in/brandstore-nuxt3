<template>
  <div>
    <!-- Баннер-слайдер (принимает pending для показа шиммера) -->
    <MainSlider :slides-data="banners" :loading="pending" />

    <div
      class="relative z-10 -mt-6 rounded-t-[25px] bg-[#13181e] overflow-hidden"
    >
      <!-- Горящие предложения -->
      <ProductSection
        title="Горящие предложения"
        :items="hotProducts"
        :loading="pending"
        :skeleton-count="5"
        :view-all-link="hotProductsLink"
        carousel
      />

      <PopularCategories :categories="categories" :loading="pending" />

      <ProductSection
        title="Новинки"
        :items="recommendedProducts"
        :loading="pending"
        :skeleton-count="5"
        carousel
      />

      <ForyouSection :favs="categories" :loading="pending" />
      <PromoBanner />
      <BrandsSection :brands="brands" :loading="pending" />
    </div>
  </div>
</template>

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
      recommended: recommendedRes?.data?.product_request ?? [],
      hotProducts: hotProductsRes?.data?.product_request ?? [],
      hotProductsParams: hotProductsRes?.data?.params ?? null,
    };
  },
);

const banners = computed(() => homeData.value?.banners ?? []);
const categories = computed(() => homeData.value?.categories ?? []);
const recommendedProducts = computed(() => homeData.value?.recommended ?? []);
const hotProducts = computed(() => homeData.value?.hotProducts ?? []);

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

<template>
  <div>
    <MainSlider :slides-data="banners" v-if="banners" />
    <div class="relative z-10 -mt-6 rounded-t-[25px] bg-[#13181e]">
      <ProductSection
        title="Горящие предложения"
        :items="hotProducts"
        viewAllLink="/catalog/personal"
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
    hotProducts: hotProductsRes?.data?.product_request ?? [],
  };
});

// Удобный доступ к данным через computed
const banners = computed(() => homeData.value?.banners ?? []);
const categories = computed(() => homeData.value?.categories ?? []);
const recommendedProducts = computed(() => homeData.value?.recommended ?? []);
const hotProducts = computed(() => homeData.value?.hotProducts ?? []);
</script>

<!-- <script setup>
const { data: bannersRaw } = await useAsyncData("banners", () =>
  api.getBanners(),
);
const { data: categoriesRaw } = await useAsyncData("categories", () =>
  api.getCategories(),
);
// const { data: hotProductsRaw } = await useAsyncData("hotProducts", () =>
//   api.getHotProducts(),
// );
const { data: recommendedRaw } = await useAsyncData("recommended", () =>
  api.getRecommendedProducts(),
);

const banners = computed(() => bannersRaw.value?.data ?? []);
const categories = computed(() => categoriesRaw.value?.data ?? []);
console.log("categ", categories);
// const hotProducts = computed(() => hotProductsRaw.value?.data ?? []);
const recommendedProducts = computed(
  () => recommendedRaw.value?.data.product_request ?? [],
);

const { data: hotProductsRaw } = await useAsyncData("hotProducts", () =>
  api.getHotProducts(),
);
const hotProducts = computed(
  () => hotProductsRaw.value?.data?.product_request ?? [],
);
console.log("recommendedProducts", recommendedProducts);
</script> -->

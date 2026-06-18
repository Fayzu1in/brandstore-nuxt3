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
</script>

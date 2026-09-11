<template>
  <div>
    <!-- Баннеры -->
    <DataLoader
      cache-key="home-banners"
      :fetcher="api.getBanners"
      v-slot="{ items, pending }"
    >
      <MainSlider :slides-data="items" :loading="pending" />
    </DataLoader>

    <!-- Горящие предложения -->
    <div
      class="relative z-10 -mt-8 sm:-mt-10 bg-[#12161D] rounded-t-[32px] pt-4"
    >
      <DataLoader
        cache-key="hot-products"
        :fetcher="api.getHotProducts"
        v-slot="{ items, title, catalogLink, pending }"
      >
        <ProductSection
          :title="title || 'Горящие предложения'"
          :items="items"
          :loading="pending"
          :skeleton-count="5"
          :view-all-link="catalogLink"
          carousel
        />
      </DataLoader>
    </div>

    <DataLoader
      cache-key="view-count-products"
      endpoint="/products"
      :params="{
        sort: 'view_count',
        asc: 0,
        per_page: 15,
        page: 1,
        category_id: 1839,
      }"
      v-slot="{ items, pending, catalogLink }"
    >
      <ProductSection
        title="Akko акция 1+1 "
        :items="items"
        :loading="pending"
        :view-all-link="catalogLink"
        carousel
      />
    </DataLoader>

    <!-- Рекомендуемые -->
    <DataLoader
      cache-key="recommended-products"
      :fetcher="api.getRecommendedProducts"
      v-slot="{ items, title, catalogLink, pending }"
    >
      <ProductSection
        :title="title || 'Рекомендуем'"
        :items="items"
        :loading="pending"
        :skeleton-count="5"
        :view-all-link="catalogLink"
        carousel
      />
    </DataLoader>
    <PopularCategories :categories="categories" :loading="pending" />
    <ForyouSection :favs="categories" :loading="pending" />
    <PromoBanner />
    <BrandsSection :brands="brands" :loading="pending" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { api } from "~/utils/api";

const { data: homeData, pending } = useLazyAsyncData(
  "home-page-data",
  async () => {
    const [categoriesRes] = await Promise.all([api.getCategories()]);

    return {
      categories: categoriesRes?.data ?? [],
    };
  },
);

const categories = computed(() => homeData.value?.categories ?? []);
</script>

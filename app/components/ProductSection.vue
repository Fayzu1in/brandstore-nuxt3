<template>
  <section class="w-full bg-[#000000] text-white py-8">
    <div class="mx-auto max-w-[1481px] w-full px-[25px]">
      <div class="flex items-end justify-between mb-6">
        <h2
          class="text-[24px] font-bold tracking-tight text-white md:text-[28px]"
        >
          {{ title }}
        </h2>

        <NuxtLink
          v-if="viewAllLink"
          :to="viewAllLink"
          class="text-[14px] font-medium text-[#a0a5ab] hover:text-[#E30909] transition-colors flex items-center gap-1 group"
        >
          Показать всё
          <span
            class="inline-block transition-transform group-hover:translate-x-1"
            >→</span
          >
        </NuxtLink>
      </div>

      <div v-if="carousel" class="relative products-carousel">
        <swiper
          :modules="[SwiperNavigation, SwiperMousewheel]"
          :space-between="20"
          :slides-per-view="1"
          :navigation="true"
          :breakpoints="{
            '480': { slidesPerView: 2 },
            '768': { slidesPerView: 3 },
            '1024': { slidesPerView: 4 },
            '1280': { slidesPerView: 5 },
          }"
          :mousewheel="{
            forceToAxis: true, // Реагирует только на горизонтальный скролл, не мешая вертикальному скроллу страницы
            releaseOnEdges: true, // Отпускает страницу, если слайды закончились
          }"
          class="w-full !overflow-visible lg:!overflow-hidden"
        >
          <swiper-slide v-for="item in items" :key="item.id">
            <ProductCard :product="item" />
          </swiper-slide>
        </swiper>
      </div>

      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
      >
        <ProductCard v-for="item in items" :key="item.id" :product="item" />
      </div>
    </div>
  </section>
</template>

<script setup>
// Импортируем Swiper для карусели товаров
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Navigation as SwiperNavigation,
  Mousewheel as SwiperMousewheel,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  viewAllLink: {
    type: String,
    default: "",
  },
  // Добавляем флаг карусели. По умолчанию false (обычная сетка)
  carousel: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
/* Кастомизация стрелок Swiper под темный стиль Технопарка */
.products-carousel .swiper-button-next,
.products-carousel .swiper-button-prev {
  color: #ffffff !important;
  background-color: rgba(28, 34, 41, 0.8);
  backdrop-filter: blur(10px);
  width: 44px;
  height: 44px;
  border-radius: 15px;
  border: 1px solid #0000002f;
  transition: all 0.2s ease;
}

.products-carousel .swiper-button-next:after,
.products-carousel .swiper-button-prev:after {
  font-size: 14px;
  font-weight: bold;
}

.products-carousel .swiper-button-next:hover,
.products-carousel .swiper-button-prev:hover {
  background-color: #e30909;
  border-color: #e30909;
}

/* Скрываем стрелки, если они задизейблены */
.products-carousel .swiper-button-disabled {
  opacity: 0 !important;
  pointer-events: none;
}
</style>

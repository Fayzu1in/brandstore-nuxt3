<template>
  <section class="w-full bg-[#000000] overflow-hidden">
    <div class="mx-auto max-w-[1481px] w-full px-[25px] pb-6">
      <div
        class="relative w-full aspect-[21/9] md:aspect-[2.4/1] rounded-3xl overflow-hidden bg-[#1c2229]"
      >
        <swiper
          :modules="[
            SwiperAutoplay,
            SwiperPagination,
            SwiperEffectFade,
            SwiperMousewheel,
          ]"
          :slides-per-view="1"
          :loop="true"
          :effect="'fade'"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          :pagination="{
            clickable: true,
            el: '.custom-pagination',
          }"
          :mousewheel="{
            forceToAxis: true, // Реагирует только на горизонтальный скролл, не мешая вертикальному скроллу страницы
            releaseOnEdges: true, // Отпускает страницу, если слайды закончились
          }"
          class="w-full h-full"
        >
          <swiper-slide
            v-for="slide in slidesData"
            :key="slide.id"
            class="relative w-full h-full"
          >
            <img
              :src="slide.image"
              :alt="slide.title"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <!-- <div
              class="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center pl-16 md:pl-24 max-w-[60%] z-10"
            >
              <div
                v-if="slide.brand"
                class="text-white text-xl md:text-2xl font-bold tracking-widest mb-4 opacity-90 uppercase"
              >
                {{ slide.brand }}
              </div>

              <h2
                class="text-3xl md:text-5xl font-bold text-white leading-tight mb-3 whitespace-pre-line"
              >
                {{ slide.title }}
              </h2>

              <p
                class="text-sm md:text-base text-gray-200 mb-8 max-w-md font-medium"
              >
                {{ slide.description }}
              </p>

              <div>
                <NuxtLink
                  :to="slide.link"
                  class="inline-block rounded-full border border-white px-8 py-2.5 text-sm font-medium text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  Подробнее
                </NuxtLink>
              </div>
            </div> -->
          </swiper-slide>
        </swiper>

        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div
            class="custom-pagination flex gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Импортируем компоненты и модули Swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Navigation as SwiperNavigation,
  Mousewheel as SwiperMousewheel,
} from "swiper/modules";
import {
  Autoplay as SwiperAutoplay,
  Pagination as SwiperPagination,
  EffectFade as SwiperEffectFade,
} from "swiper/modules";

// Импортируем базовые стили Swiper и эффекта Fade
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Принимаем данные, которые прилетели с бэка через useFetch в родителе
defineProps({
  slidesData: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style>
/* Стилизация точек пагинации под дизайн Технопарка */
.custom-pagination .swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.4) !important;
  opacity: 1;
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;
}

.custom-pagination .swiper-pagination-bullet-active {
  width: 24px; /* Активная точка превращается в овальную полоску */
  background-color: #ffffff !important;
  border-radius: 4px;
}
</style>

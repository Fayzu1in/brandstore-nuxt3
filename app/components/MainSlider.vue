<template>
  <section class="w-full overflow-hidden relative">
    <div class="w-full bg-[#1c2229]">
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
          forceToAxis: true,
          releaseOnEdges: true,
        }"
        class="w-full h-[40vh] sm:h-[50vh] md:h-[65vh] lg:h-[75vh] min-h-[400px] max-h-[800px]"
      >
        <swiper-slide
          v-for="slide in slidesData"
          :key="slide.id"
          class="relative w-full h-full overflow-hidden"
        >
          <img
            src="https://cdn2.technopark.ru/technopark/photos_resized/banner_v2_size_4000_1045/4000_1045/843854/1_843854.jpg?timestamp=2026-09-01_15-38-17"
            :alt="slide.title"
            class="absolute inset-0 w-full h-full object-cover object-center"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-[#000000]/40 via-transparent to-transparent z-10"
          ></div>

          <div
            class="relative z-10 mx-auto max-w-[1481px] h-full w-full px-[25px] pt-[120px] flex items-center"
          ></div>
        </swiper-slide>
      </swiper>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div
          class="custom-pagination flex gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Mousewheel as SwiperMousewheel } from "swiper/modules";
import {
  Autoplay as SwiperAutoplay,
  Pagination as SwiperPagination,
  EffectFade as SwiperEffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

defineProps({
  slidesData: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style>
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
  width: 24px;
  background-color: #ffffff !important;
  border-radius: 4px;
}
</style>

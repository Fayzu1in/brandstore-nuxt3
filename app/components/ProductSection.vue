<template>
  <section class="w-full text-white py-8">
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

      <div
        v-if="loading && (!items || !items.length)"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
      >
        <ProductCardSkeleton v-for="n in skeletonCount" :key="n" />
      </div>

      <!-- Вариант 1: Swiper Карусель -->
      <div v-else-if="carousel" class="relative products-carousel">
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
            forceToAxis: true,
            releaseOnEdges: true,
          }"
          class="w-full !overflow-visible lg:!overflow-hidden"
        >
          <swiper-slide v-for="item in items" :key="item.id">
            <ProductCard :product="item" />
          </swiper-slide>
        </swiper>
      </div>

      <!-- Вариант 2: Сетка с отдельным элементом-триггером внизу -->
      <div v-else>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        >
          <ProductCard v-for="item in items" :key="item.id" :product="item" />
          <!-- Шиммеры для подгрузки новых страниц снизу (Infinity Scroll) -->
          <template v-if="loading && items.length">
            <ProductCardSkeleton v-for="n in 5" :key="'append-' + n" />
          </template>
        </div>

        <!-- Отдельный триггер внизу сетки для железного срабатывания -->
        <div ref="triggerRef" class="w-full h-10 my-2"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Navigation as SwiperNavigation,
  Mousewheel as SwiperMousewheel,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const props = defineProps({
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
    type: [String, Object],
    default: "",
  },
  carousel: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  skeletonCount: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["load-more"]);

const triggerRef = ref(null);
let observer = null;

const setupObserver = () => {
  if (props.carousel) return;

  if (observer) {
    observer.disconnect();
  }

  if (!triggerRef.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !props.loading) {
        emit("load-more");
      }
    },
    {
      rootMargin: "200px", // Подгружаем за 200px до триггера
      threshold: 0,
    },
  );

  observer.observe(triggerRef.value);
};

onMounted(async () => {
  await nextTick();
  setupObserver();
});

watch(
  () => props.items.length,
  async () => {
    await nextTick();
    setupObserver();
  },
);

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style>
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

.products-carousel .swiper-button-disabled {
  opacity: 0 !important;
  pointer-events: none;
}
</style>

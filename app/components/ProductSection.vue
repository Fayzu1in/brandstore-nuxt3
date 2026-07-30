<template>
  <section class="w-full text-white py-8 overflow-hidden">
    <div class="mx-auto max-w-[1481px] w-full px-[25px]">
      <div class="flex items-center justify-between gap-2 mb-4 md:mb-6">
        <!-- Заголовок: уменьшен размер шрифта на мобайле (18px -> 28px) + запрет переноса одной строки -->
        <h2
          class="text-[18px] sm:text-[22px] md:text-[28px] font-bold tracking-tight text-white leading-tight truncate pr-2"
        >
          {{ title }}
        </h2>

        <!-- Ссылка: См. все на мобилке / Показать всё на десктопе -->
        <NuxtLink
          v-if="viewAllLink"
          :to="viewAllLink"
          class="text-[12px] sm:text-[14px] font-medium text-[#a0a5ab] hover:text-[#E30909] transition-colors flex items-center gap-1 shrink-0 whitespace-nowrap group"
        >
          <!-- На мобилках "См. все", начиная с sm "Показать всё" -->
          <span class="sm:hidden">См. все</span>
          <span class="hidden sm:inline">Показать всё</span>

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
/* 1. Плашка-контейнер во всю высоту */
.products-carousel .swiper-button-next,
.products-carousel .swiper-button-prev {
  top: 0 !important;
  bottom: 0 !important;
  margin-top: 0 !important;
  height: 100% !important;
  width: 48px !important;
  z-index: 20 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #ffffff !important;

  /* ЖЕСТКО УМЕНЬШАЕМ СТРЕЛКУ СВАЙПЕРА */
  --swiper-navigation-size: 14px !important;
}

/* Градиент справа */
.products-carousel .swiper-button-next {
  right: 0 !important;
  background: linear-gradient(
    270deg,
    rgba(19, 24, 30, 0.85) 0%,
    rgba(19, 24, 30, 0) 100%
  ) !important;
  border-top-right-radius: 16px !important;
  border-bottom-right-radius: 16px !important;
}

/* Градиент слева */
.products-carousel .swiper-button-prev {
  left: 0 !important;
  background: linear-gradient(
    90deg,
    rgba(19, 24, 30, 0.85) 0%,
    rgba(19, 24, 30, 0) 100%
  ) !important;
  border-top-left-radius: 16px !important;
  border-bottom-left-radius: 16px !important;
}

/* 2. Делаем подложку под стрелку маленькой и круглой */
.products-carousel .swiper-button-next::after,
.products-carousel .swiper-button-prev::after {
  font-size: 14px !important; /* Доп. фиксация */
  font-weight: bold;
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  max-width: 32px !important;
  max-height: 32px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(4px);
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

/* Ховер */
.products-carousel .swiper-button-next:hover::after,
.products-carousel .swiper-button-prev:hover::after {
  background-color: #e30909 !important;
  transform: scale(1.1);
}

/* Скрываем на мобилках */
@media (max-width: 640px) {
  .products-carousel .swiper-button-next,
  .products-carousel .swiper-button-prev {
    display: none !important;
  }
}

.products-carousel .swiper-button-disabled {
  opacity: 0 !important;
  pointer-events: none;
}
</style>

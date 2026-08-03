<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "~/stores/useCategoryStore";

const route = useRoute();
const categoryStore = useCategoryStore();

// Получаем текущий slug из URL
const currentSlug = computed(() => route.params.slug as string);

// Мгновенно берем текущую категорию из стора
const currentCategory = computed(() => {
  return categoryStore.getCategoryBySlug(currentSlug.value);
});
console.log("currentCategory", currentCategory.value);

// Список подкатегорий (childs из API)
const subcategories = computed(() => {
  return currentCategory.value?.childs || [];
});
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-4 py-4 md:py-8">
    <!-- Заголовок категории -->
    <h1
      class="text-xl md:text-3xl font-bold mb-5 md:mb-8 uppercase text-white tracking-wide"
    >
      {{ currentCategory?.name || "Загрузка..." }}
    </h1>

    <!-- Список подкатегорий -->
    <div
      v-if="subcategories.length"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6"
    >
      <NuxtLink
        v-for="sub in subcategories"
        :key="sub.id"
        :to="`/catalog/${currentSlug}/${sub.slug}`"
        class="card-container group relative w-full bg-[#1b233d]/60 hover:bg-[#1b233d] border border-white/5 hover:border-[#E30909]/40 rounded-[16px] sm:rounded-[20px] p-2 overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1.5"
      >
        <div
          class="top-section relative h-[100px] sm:h-[140px] rounded-[12px] sm:rounded-[15px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#E30909] via-[#910505] to-[#12161D]"
        >
          <div
            class="custom-skew-border absolute top-0 left-0 h-[20px] sm:h-[28px] w-[75px] sm:w-[110px] bg-[#13181e] rounded-br-[8px] sm:rounded-br-[10px] z-10"
          ></div>

          <!-- <div
            class="relative z-20 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/30 backdrop-blur-md border border-white/10 group-hover:scale-110 group-hover:border-[#E30909] transition-all duration-300 overflow-hidden"
          >
            <img
              v-if="sub.image"
              :src="sub.wicon"
              :alt="sub.name"
              class="w-full h-full object-cover p-2"
            />

            <Icon
              v-else
              name="mdi:shape-outline"
              class="w-6 h-6 sm:w-9 sm:h-9 text-white group-hover:text-[#E30909] transition-colors duration-300"
            />
          </div> -->
        </div>

        <div class="bottom-section py-2.5 sm:py-4 px-1 sm:px-2 text-center">
          <span
            class="title block text-xs sm:text-sm font-bold text-white group-hover:text-[#E30909] transition-colors duration-200 line-clamp-2 leading-tight sm:leading-snug"
          >
            {{ sub.name }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- Заглушка, если подкатегорий нет -->
    <div
      v-else-if="!categoryStore.isLoading"
      class="py-16 text-center text-gray-400 bg-[#1b233d]/30 rounded-2xl border border-white/5"
    >
      В данной категории пока нет подкатегорий.
    </div>
  </div>
</template>

<style scoped>
.custom-skew-border {
  transform: skew(-35deg);
  transform-origin: top left;
}

.custom-skew-border::before {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  top: 0;
  right: -12px;
  background: transparent;
  border-top-left-radius: 8px;
  box-shadow: -4px -4px 0 2px #13181e;
}

.top-section::before {
  content: "";
  position: absolute;
  top: 28px;
  left: 0;
  background: transparent;
  height: 12px;
  width: 12px;
  border-top-left-radius: 10px;
  box-shadow: -4px -4px 0 2px #13181e;
  z-index: 10;
}
</style>

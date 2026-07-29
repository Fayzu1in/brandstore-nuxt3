<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { CATALOG_MOCK_DATA } from "~/data/catalog";

const route = useRoute();

// Получаем slug из URL (/catalog/smartfony-i-gadzhety -> slug = "smartfony-i-gadzhety")
const currentSlug = computed(() => route.params.slug);

// --- СЕЙЧАС: Данные из моков ---
const categoryData = computed(() => {
  return (
    CATALOG_MOCK_DATA[currentSlug.value] || {
      title: "Категория",
      subcategories: [],
    }
  );
});

/* 
  --- ПОЗЖЕ: Когда появится API, просто заменяешь блок выше на это: ---
  
  const { data: categoryData, status } = await useAsyncData(
    () => `category-${currentSlug.value}`,
    () => api.getCategoryBySlug(currentSlug.value),
    { watch: [currentSlug], lazy: true }
  )
*/
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-4 py-8">
    <!-- Хлебные крошки -->
    <nav
      class="flex items-center gap-2 text-xs md:text-sm font-bold tracking-wide uppercase mb-8"
    >
      <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">
        Главная
      </NuxtLink>
      <span class="text-gray-500">→</span>
      <span class="text-[#E30909]">
        {{ categoryData.title }}
      </span>
    </nav>

    <!-- Заголовок страницы -->
    <h1
      class="text-2xl md:text-3xl font-bold mb-8 uppercase text-white tracking-wide"
    >
      {{ categoryData.title }}
    </h1>

    <!-- Сетка карточек -->
    <div
      v-if="categoryData.subcategories.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <NuxtLink
        v-for="sub in categoryData.subcategories"
        :key="sub.id"
        :to="`/catalog/${currentSlug}/${sub.slug}`"
        class="card-container group relative w-full bg-[#1b233d]/60 hover:bg-[#1b233d] border border-white/5 hover:border-[#E30909]/40 rounded-[20px] p-2 overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1.5"
      >
        <!-- Верхняя секция с градиентом и MDI иконкой -->
        <div
          class="top-section relative h-[140px] rounded-[15px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#E30909] via-[#910505] to-[#12161D]"
        >
          <!-- Декоративный срезанный угол в стиле Uiverse -->
          <div
            class="custom-skew-border absolute top-0 left-0 h-[28px] w-[110px] bg-[#13181e] rounded-br-[10px] z-10"
          ></div>

          <!-- MDI Иконка с эффектом свечения и зума -->
          <div
            class="relative z-20 flex items-center justify-center w-16 h-16 rounded-full bg-black/30 backdrop-blur-md border border-white/10 group-hover:scale-110 group-hover:border-[#E30909] transition-all duration-300"
          >
            <Icon
              :name="sub.icon"
              class="w-9 h-9 text-white group-hover:text-[#E30909] transition-colors duration-300"
            />
          </div>
        </div>

        <!-- Нижняя секция с названием -->
        <div class="bottom-section py-4 px-2 text-center">
          <span
            class="title block text-sm font-bold text-white group-hover:text-[#E30909] transition-colors duration-200 line-clamp-2 leading-snug"
          >
            {{ sub.title }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- Заглушка, если категория пуста -->
    <div
      v-else
      class="py-16 text-center text-gray-400 bg-[#1b233d]/30 rounded-2xl border border-white/5"
    >
      В данной категории пока нет подкатегорий.
    </div>
  </div>
</template>

<style scoped>
/* Воссоздаем точную геометрию скоса из UIverse */
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

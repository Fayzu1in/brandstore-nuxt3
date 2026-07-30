<script setup>
import { computed } from "vue";

// Используем ваш метод из api.ts с неблокирующим запросом (lazy: true)
const { data: postsRaw, status } = await useAsyncData(
  "techno-blogs",
  () => api.getTechnoBlogs(),
  { lazy: true },
);

// Безопасное извлечение массива статей (в зависимости от структуры ответа API)
const posts = computed(() => {
  if (!postsRaw.value) return [];
  return Array.isArray(postsRaw.value)
    ? postsRaw.value
    : (postsRaw.value?.data ?? []);
});

// Функция форматирования даты (например, "2026-07-24T12:00:00" -> "24.07.2026")
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-4 py-8">
    <h1
      class="text-2xl md:text-3xl font-bold text-white text-center mb-8 uppercase tracking-wide"
    >
      Техноблог
    </h1>
    <!-- Скелетон при загрузке -->
    <div
      v-if="status === 'pending'"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="bg-[#1c232e] rounded-2xl h-[420px] animate-pulse p-4 flex flex-col gap-4"
      >
        <div class="w-full h-48 bg-gray-700/50 rounded-xl"></div>
        <div class="h-4 bg-gray-700/50 rounded w-1/2"></div>
        <div class="h-6 bg-gray-700/50 rounded w-3/4"></div>
        <div class="h-16 bg-gray-700/50 rounded w-full"></div>
      </div>
    </div>

    <!-- Основной список статей -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <NuxtLink
        v-for="article in posts"
        :key="article.id"
        :to="`/articles`"
        class="group bg-[#1c232e] hover:bg-[#232b38] transition-colors duration-200 rounded-2xl overflow-hidden flex flex-col border border-gray-800/40 shadow-lg"
      >
        <!-- Обложка статьи -->
        <div class="relative w-full aspect-[16/10] overflow-hidden bg-gray-800">
          <img
            :src="article.image.url"
            :alt="article.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <!-- Контент карточки -->
        <div class="p-5 flex flex-col flex-1">
          <!-- Мета-данные: Просмотры и Дата -->
          <div
            class="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium"
          >
            <!-- Дата -->
            <div class="flex items-center gap-1.5">
              <Icon name="mdi:calendar" class="text-l transition-transform" />
              <span>{{ formatDate(article.created_at || article.date) }}</span>
            </div>
          </div>

          <!-- Заголовок -->
          <h3
            class="text-white text-base font-semibold leading-snug mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors"
          >
            {{ article.title }}
          </h3>

          <!-- Описание/Анонс -->
          <p
            class="text-gray-400 text-xs leading-relaxed line-clamp-4 font-normal"
          >
            {{
              article.description ||
              article.short_description ||
              article.excerpt
            }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

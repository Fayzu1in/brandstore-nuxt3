<script setup lang="ts">
import { useFavoritesStore } from "~/stores/useFavoritesStore";

const favoritesStore = useFavoritesStore();
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 py-8 min-h-[60vh] text-white">
    <!-- Заголовок и счетчик -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold flex items-center gap-3">
        <span>Избранное</span>
        <span
          v-if="favoritesStore.count > 0"
          class="text-sm font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300"
        >
          {{ favoritesStore.count }}
        </span>
      </h1>

      <!-- Кнопка очистить всё -->
      <button
        v-if="favoritesStore.count > 0"
        @click="favoritesStore.clearFavorites()"
        type="button"
        class="text-sm text-gray-400 hover:text-[#E30909] transition-colors flex items-center gap-1.5"
      >
        <Icon name="lucide:trash-2" class="w-4 h-4" />
        <span>Очистить список</span>
      </button>
    </div>

    <!-- Если есть товары в избранном -->
    <div
      v-if="favoritesStore.count > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      <ProductCard
        v-for="product in favoritesStore.items"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Пустое состояние (Empty State) -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-16 text-center bg-white/5 rounded-3xl border border-white/10 p-6"
    >
      <div
        class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-400"
      >
        <Icon name="mdi:heart-outline" class="w-8 h-8" />
      </div>
      <h2 class="text-xl font-semibold mb-2">В избранном пока ничего нет</h2>
      <p class="text-gray-400 text-sm max-w-md mb-6">
        Добавляйте товары в список желаний с помощью значка сердечка на карточке
        товара.
      </p>
      <NuxtLink
        to="/"
        class="bg-[#E30909] hover:bg-[#b80707] text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
      >
        Перейти к покупкам
      </NuxtLink>
    </div>
  </div>
</template>

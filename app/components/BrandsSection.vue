<template>
  <section class="w-full text-white py-8">
    <div class="mx-auto max-w-[1481px] w-full px-[25px]">
      <div class="flex items-end justify-between mb-6">
        <h2
          class="text-[24px] font-bold tracking-tight text-white md:text-[28px]"
        >
          Выбери свой бренд
        </h2>

        <NuxtLink
          v-if="viewAllLink"
          :to="viewAllLink"
          class="text-[14px] font-medium text-[#a0a5ab] hover:text-[#00a0e3] transition-colors flex items-center gap-1 group"
        >
          Смотреть всё
          <span
            class="inline-block transition-transform group-hover:translate-x-1"
            >→</span
          >
        </NuxtLink>
      </div>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <NuxtLink
          v-for="(brand, index) in items.length ? items : localBrands"
          :key="index"
          :to="brand.link || '#'"
          class="group relative flex items-center justify-center bg-[#1c2229] border border-gray-800/30 rounded-2xl p-6 h-[110px] cursor-pointer overflow-hidden transition-all duration-300 hover:bg-[#232a33] hover:border-gray-700 hover:shadow-lg hover:shadow-black/40"
        >
          <div
            class="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <img
            :src="brand.image"
            :alt="brand.name"
            class="max-w-[75%] max-h-[50px] object-contain transition-all duration-300 filter grayscale brightness-200 contrast-200 group-hover:scale-105 group-hover:filter-none"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// 1. Импортируем локальные логотипы для захардкоженного варианта
import imgAsus from "~/assets/img/brands/asus.webp"; // создай папку brands или поправь пути
import imgHp from "~/assets/img/brands/hp.webp";
import imgCanon from "~/assets/img/brands/canon.webp";
import imgKingston from "~/assets/img/brands/kingston.webp";
import imgZyxel from "~/assets/img/brands/zyxel.webp";

// 2. Готовим пропсы для динамических данных с бэка
defineProps({
  // Если завтра данные придут с бэка, передаем их сюда
  items: {
    type: Array,
    default: () => [],
  },
  // Ссылка на страницу всех брендов
  viewAllLink: {
    type: String,
    default: "/brands",
  },
});

// 3. Локальный массив по умолчанию (пока бэк не готов)
const localBrands = [
  { name: "Zyxel", image: imgZyxel, link: "/catalog/zyxel" },
  { name: "Kingston", image: imgKingston, link: "/catalog/kingston" },
  { name: "Canon", image: imgCanon, link: "/catalog/canon" },
  { name: "HP", image: imgHp, link: "/catalog/hp" },
  { name: "Asus", image: imgAsus, link: "/catalog/asus" },
  //   { name: "Zyxel 2", image: imgZyxel, link: "/catalog/zyxel" }, // Просто дублирую для примера сетки из 10 штук
  //   { name: "Kingston 2", image: imgKingston, link: "/catalog/kingston" },
  //   { name: "Canon 2", image: imgCanon, link: "/catalog/canon" },
  //   { name: "HP 2", image: imgHp, link: "/catalog/hp" },
  //   { name: "Asus 2", image: imgAsus, link: "/catalog/asus" },
];
</script>

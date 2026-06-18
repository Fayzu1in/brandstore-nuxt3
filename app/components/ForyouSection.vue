<template>
  <section class="w-full text-white py-8">
    <div class="mx-auto max-w-[1481px] w-full px-[25px]">
      <h2
        class="text-[24px] font-bold tracking-tight text-white md:text-[28px] mb-6"
      >
        Подборки для вас
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="(banner, index) in localBanners"
          :key="index"
          :to="banner.link"
          class="group relative h-[280px] w-full rounded-2xl overflow-hidden bg-[#1c2229] border border-gray-800/40 cursor-pointer flex items-end p-6"
        >
          <div class="absolute inset-0 w-full h-full overflow-hidden">
            <img
              :src="banner.image"
              :alt="banner.title"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90"
            ></div>
          </div>

          <div
            class="relative z-10 w-full transform transition-transform duration-300 group-hover:-translate-y-1"
          >
            <span
              class="text-[11px] font-semibold uppercase tracking-widest text-[#00a0e3] mb-1.5 block opacity-90"
            >
              Специальная подборка
            </span>

            <h3
              class="text-[20px] font-bold text-white leading-tight max-w-[85%]"
            >
              {{ banner.title }}
              <span
                class="block h-[2px] w-0 bg-white mt-1 transition-all duration-300 group-hover:w-16"
              ></span>
            </h3>
          </div>

          <div
            class="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 transform translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
          >
            <span class="text-white text-sm">→</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Импортируем твои сохраненные картинки из assets
import imgGamers from "~/assets/img/forGamers.webp"; // Переименуй под свои реальные названия файлов
import imgHome from "~/assets/img/techForYourHome.webp";
import imgMobile from "~/assets/img/forMobilePeople.webp";

// Локальный захардкоженный массив подборок
const localBanners = [
  {
    title: "Для настоящих геймеров",
    image: imgGamers,
    link: "/catalog/gamers",
  },
  {
    title: "Техника для вашего дома",
    image: imgHome,
    link: "/catalog/home-appliances",
  },
  {
    title: "Для мобильных людей",
    image: imgMobile,
    link: "/catalog/smartphones",
  },
];
</script>

<template>
  <section class="w-full text-white py-6">
    <div class="mx-auto max-w-[1481px] w-full px-[25px]">
      <NuxtLink
        :to="link"
        class="group relative flex w-full h-[200px] sm:h-[240px] md:h-[280px] rounded-2xl overflow-hidden bg-[#1c2229] border border-gray-800/40 shadow-lg shadow-black/50 cursor-pointer"
      >
        <div class="absolute inset-0 w-full h-full overflow-hidden">
          <img
            :src="imageSrc"
            :alt="alt"
            class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div
            class="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"
          ></div>
        </div>

        <div
          class="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-[#E30909] group-hover:border-[#E30909]"
        >
          <span class="text-white text-lg font-bold">→</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
// Импортируем твою скачанную картинку по умолчанию
import defaultAsusBanner from "~/assets/img/asus.webp";

// Пропсы полностью готовы к динамическим данным с бэка
defineProps({
  // Путь к картинке. Если с бэка ничего не придет, сработает дефолтный asus.webp
  imageSrc: {
    type: String,
    default: defaultAsusBanner,
  },
  // Ссылка для перехода при клике на баннер
  link: {
    type: String,
    default: "/catalog/gaming-asus",
  },
  // Альт текст для SEO оптимизации картинок
  alt: {
    type: String,
    default: "ASUS Republic of Gamers Promo",
  },
});
</script>

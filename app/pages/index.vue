<template>
  <div>
    <MainSlider :slides-data="banners" v-if="banners" />
  </div>
</template>

<script setup>
// Пример получения данных с API в Nuxt
// const { data: banners } = await useFetch('/api/v1/home-banners')

// Временные моковые данные для теста, имитирующие ответ с бэка
const banners = ref([
  {
    id: 1,
    brand: "QYRON | A",
    title: "Энергия движения\nи восстановления",
    description: "Лимитированная серия массажных кресел",
    image: "https://dl.bs365.uz/storage/sliders/236/LQ0NMAv4wxk2bzbK6qs4.jpg", // Подставь свою урлу
    link: "/catalog/qyron-x",
  },
  {
    id: 2,
    brand: "BORK",
    title: "Чистота совершенства",
    description: "Премиальная бытовая техника для дома",
    image: "https://dl.bs365.uz/storage/sliders/237/uapGQpWiIuqtns09tSwJ.jpg",
    link: "/catalog/bork",
  },
]);
</script>

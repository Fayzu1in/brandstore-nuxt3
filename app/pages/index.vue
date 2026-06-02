<template>
  <div>
    <MainSlider :slides-data="banners" v-if="banners" />
    <div>
      <ProductSection
        title="Персональные предложения"
        :items="personalProducts"
        viewAllLink="/catalog/personal"
        carousel
      />

      <ProductSection title="Успей купить" :items="hotProducts" />
    </div>
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
    image: "https://dl.bs365.uz/storage/sliders/240/QTBUuR45gdxlnPPcIvDN.jpg", // Подставь свою урлу
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
const personalProducts = ref([
  { id: 1, name: "Кофемашина Jura E8 Piano", price: "149 990" },
  { id: 2, name: "Sony PlayStation 5 Slim", price: "61 770" },
  { id: 3, name: "Беспроводное зарядное устройство", price: "10 990" },
  { id: 4, name: "Ноутбук ASUS ZenBook 14", price: "122 590" },
  { id: 5, name: "Планшет Apple iPad Air", price: "89 000" },
  { id: 6, name: "Планшет Apple iPad Air", price: "89 000" },
  { id: 7, name: "Планшет Apple iPad Air", price: "89 000" },
]);

const hotProducts = ref([
  { id: 1, name: "Фен Dyson Supersonic", price: "55 000" },
  { id: 2, name: "Телевизор Samsung Neo QLED", price: "240 000" },
]);
</script>

<template>
  <div>
    <MainSlider :slides-data="banners" class="-mt-[58px]" v-if="banners" />
    <div>
      <ProductSection
        title="Горящие предложения"
        :items="personalProducts"
        viewAllLink="/catalog/personal"
        carousel
      />

      <PopularCategories :categories="homeCategories" />
      <ProductSection title="Новинки" :items="hotProducts" />
      <ForyouSection :favs="homeCategories" />
      <PromoBanner />
      <BrandsSection />
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
const homeCategories = ref([
  {
    name: "Телефоны и планшеты",
    image:
      "https://www.freeiconspng.com/uploads/smartphone-and-tablet-png-25.png",
    link: "/catalog/conditioners",
  },
  {
    name: "Телефоны и планшеты",
    image:
      "https://www.freeiconspng.com/uploads/smartphone-and-tablet-png-25.png",
    link: "/catalog/tvs",
  },
  {
    name: "Телефоны и планшеты",
    image:
      "https://www.freeiconspng.com/uploads/smartphone-and-tablet-png-25.png",
    link: "/catalog/laptops",
  },
  {
    name: "Телефоны и планшеты",
    image:
      "https://www.freeiconspng.com/uploads/smartphone-and-tablet-png-25.png",
    link: "/catalog/refrigerators",
  },
  {
    name: "Телефоны и планшеты",
    image:
      "https://www.freeiconspng.com/uploads/smartphone-and-tablet-png-25.png",
    link: "/catalog/washers",
  },
  {
    name: "Телефоны и планшеты",
    image:
      "https://www.freeiconspng.com/uploads/smartphone-and-tablet-png-25.png",
    link: "/catalog/smartphones",
  },
  {
    name: "Телефоны и планшеты",
    image:
      "https://www.freeiconspng.com/uploads/smartphone-and-tablet-png-25.png",
    link: "/catalog/audio",
  },
  {
    name: "Телефоны и планшеты",
    image:
      "https://www.freeiconspng.com/uploads/smartphone-and-tablet-png-25.png",
    link: "/catalog/coffee",
  },
  {
    name: "Чайники",
    image:
      "https://www.freeiconspng.com/uploads/smartphone-and-tablet-png-25.png",
    link: "/catalog/kettles",
  },
  {
    name: "Пылесосы",
    image:
      "https://www.freeiconspng.com/uploads/smartphone-and-tablet-png-25.png",
    link: "/catalog/vacuums",
  },
]);
</script>

<template>
  <nav
    class="w-full bg-black/40 backdrop-blur-md border-b border-white/5 z-30 transition-all duration-300"
  >
    <div
      class="mx-auto flex h-[48px] sm:h-[58px] max-w-[1481px] w-full items-center justify-between px-4 sm:px-[25px]"
    >
      <!-- Обертка со скроллом для мобилок -->
      <div
        class="flex items-center gap-5 sm:gap-7 w-full overflow-x-auto no-scrollbar whitespace-nowrap"
      >
        <NuxtLink
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.link"
          class="relative py-3 sm:py-4 text-[13px] sm:text-[14px] font-medium text-[#a0a5ab] hover:text-white transition-colors duration-200 shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#E30909] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          active-class="!text-white after:!scale-x-100 font-semibold"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
const menuItems = [
  { name: "Для геймеров", link: "/catalog/dlya-gejmerov" },
  { name: "Смартфоны и гаджеты", link: "/catalog/smartfony-i-gadzhety" },
  { name: "Компьютеры и ноутбуки", link: "/catalog/kompyutery-i-noutbuki" },
  { name: "Комплектующие для ПК", link: "/catalog/komplektuyushchie-dlya-pk" },
  { name: "Компьютерная периферия", link: "/catalog/kompyuternaya-periferiya" },
];
</script>

<style scoped>
/* Скрываем стандартный дефолтный скроллбар браузера для чистого вида */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

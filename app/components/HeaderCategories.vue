<template>
  <nav
    class="w-full bg-black/40 backdrop-blur-md border-b border-white/5 z-30 transition-all duration-300"
  >
    <div
      class="mx-auto flex h-[58px] max-w-[1481px] w-full items-center justify-between px-[25px]"
    >
      <div class="flex items-center gap-7">
        <NuxtLink
          to="/for-gamers"
          class="relative py-4 text-[14px] font-bold text-[#E30909] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#E30909] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          Для геймеров
        </NuxtLink>

        <NuxtLink
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.link"
          class="relative py-4 text-[14px] font-medium text-[#a0a5ab] hover:text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#E30909] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          {{ item.name }}
        </NuxtLink>
      </div>

      <div class="flex-shrink-0">
        <button
          class="flex items-center gap-2 rounded-full border border-[#E30909] px-4 py-1.5 text-[14px] font-medium text-white hover:bg-[#E30909]/20 transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-4 h-4 text-[#E30909]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
          Сервисы
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
const menuItems = [
  { name: "Смартфоны и гаджеты", link: "/smartphones" },
  { name: "Компьютеры и ноутбуки", link: "/computers" },
  { name: "Комплектующие для ПК", link: "/components" },
  { name: "Компьютерная периферия", link: "/peripherals" },
];
</script>

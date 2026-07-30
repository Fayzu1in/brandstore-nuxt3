<template>
  <!-- Внешняя обертка главного навбара -->
  <section
    class="w-full bg-[#000000] text-white py-3 shadow-lg shadow-black/40"
  >
    <!-- Основной контейнер -->
    <div
      class="mx-auto flex flex-col md:flex-row max-w-[1481px] w-full items-center justify-between px-4 sm:px-[25px] gap-3 md:gap-6"
    >
      <!-- ВЕРХНИЙ РЯД НА МОБИЛКЕ (Лого + Экшены) -->
      <div class="flex items-center justify-between w-full md:w-auto">
        <!-- ЛЕВАЯ ЧАСТЬ: Логотип -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="block">
            <span
              class="text-xl sm:text-2xl font-bold tracking-wider text-white"
            >
              <span class="text-[#FFFF] bg-[#E30909] p-[3px]">BRAND</span>
              <span class="text-[#FFFF] p-[3px]">STORE</span>
            </span>
          </NuxtLink>
        </div>

        <!-- ПРАВАЯ ЧАСТЬ НА МОБИЛКЕ: Иконки (Избранное / Корзина) -->
        <div class="flex items-center gap-4 md:hidden">
          <NuxtLink
            to="/favourites"
            class="flex flex-col items-center text-[#a0a5ab] hover:text-white transition-colors group"
          >
            <Icon
              name="mdi:cards-heart"
              class="text-2xl transition-transform group-hover:scale-110"
            />
          </NuxtLink>

          <NuxtLink
            to="/cart"
            class="flex flex-col items-center text-[#a0a5ab] hover:text-white transition-colors group"
          >
            <Icon
              name="mdi:cart"
              class="text-2xl transition-transform group-hover:scale-110"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- СРЕДНЯЯ ЧАСТЬ: Поиск (На мобилке встает вниз на всю ширину) -->
      <div class="w-full md:flex-grow md:max-w-[680px]">
        <div
          class="relative flex items-center w-full h-[40px] sm:h-[44px] bg-white rounded-full p-1 pl-2 sm:pl-2 pr-4 overflow-hidden"
        >
          <!-- Кнопка "Каталог" (на совсем маленьких экранах можно скрыть текст или кнопку) -->
          <button
            class="flex items-center gap-1.5 sm:gap-2 bg-[#E30909] text-white px-3 sm:px-5 py-2 rounded-full font-medium text-[13px] sm:text-[15px] hover:bg-[#b80707] transition-colors cursor-pointer h-[32px] sm:h-[36px] flex-shrink-0"
          >
            <span class="text-base sm:text-lg leading-none">≡</span>
            <span class="hidden xs:inline sm:inline">Каталог</span>
          </button>

          <!-- Само поле ввода -->
          <input
            type="text"
            placeholder="Искать товары"
            class="w-full bg-transparent pl-2 sm:pl-4 text-black placeholder-gray-400 focus:outline-none text-[14px] sm:text-[15px]"
          />

          <!-- Иконка лупы (SVG) -->
          <button
            class="text-[#E30909] hover:scale-105 transition-transform cursor-pointer flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- ПРАВАЯ ЧАСТЬ НА ДЕСКТОПЕ (Скрыта на мобилке, так как ушла наверх) -->
      <div class="hidden md:flex items-center gap-6 flex-shrink-0">
        <NuxtLink
          to="/favourites"
          class="flex flex-col items-center gap-1 text-[#a0a5ab] hover:text-white transition-colors cursor-pointer group"
        >
          <Icon
            name="mdi:cards-heart"
            class="text-xl transition-transform group-hover:scale-110"
          />
          <span class="text-[12px]">Избранное</span>
        </NuxtLink>

        <NuxtLink
          to="/cart"
          class="flex flex-col items-center gap-1 text-[#a0a5ab] hover:text-white transition-colors cursor-pointer group"
        >
          <Icon
            name="mdi:cart"
            class="text-xl transition-transform group-hover:scale-110"
          />
          <span class="text-[12px]">Корзина</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

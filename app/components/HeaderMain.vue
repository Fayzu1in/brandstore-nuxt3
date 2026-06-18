<template>
  <!-- Внешняя обертка главного навбара -->
  <section
    class="w-full bg-[#000000] text-white py-3 shadow-lg shadow-black/40"
  >
    <!-- Основной контейнер, центрированный, с жестким ограничением ширины -->
    <div
      class="mx-auto flex max-w-[1481px] w-full items-center justify-between px-[25px] gap-6"
    >
      <!-- ЛЕВАЯ ЧАСТЬ: Логотип -->
      <div class="flex-shrink-0">
        <NuxtLink to="/" class="block">
          <!-- Вместо img пока можно оставить кастомный текст или SVG -->
          <span class="text-2xl font-bold tracking-wider text-white">
            <span class="text-[#FFFF] bg-[#E30909] p-[3px]">BRAND</span
            ><span class="text-[#FFFF] p-[3px]">STORE</span>
          </span>
        </NuxtLink>
      </div>

      <!-- СРЕДНЯЯ ЧАСТЬ: Будущий компонент поиска -->
      <!-- flex-grow позволяет поиску растягиваться и занимать всё свободное пространство -->
      <div class="flex-grow max-w-[680px]">
        <div
          class="relative flex items-center w-full h-[44px] bg-white rounded-full pl-2 pr-4 overflow-hidden"
        >
          <!-- Кнопка "Каталог" внутри поиска -->
          <button
            class="flex items-center gap-2 bg-[#E30909] text-white px-5 py-2 rounded-full font-medium text-[15px] hover:bg-[#008cc7] transition-colors cursor-pointer h-[36px]"
          >
            <span class="text-lg leading-none">≡</span> Каталог
          </button>

          <!-- Само поле ввода (Заглушка) -->
          <input
            type="text"
            placeholder="Искать товары"
            class="w-full bg-transparent pl-4 text-black placeholder-gray-400 focus:outline-none text-[15px]"
          />

          <!-- Иконка лупы (SVG) -->
          <button
            class="text-[#00a0e3] hover:scale-105 transition-transform cursor-pointer"
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

      <!-- ПРАВАЯ ЧАСТЬ: Кнопки личного кабинета / корзины -->
      <div class="flex items-center gap-6 flex-shrink-0">
        <!-- Сравнение -->
        <button
          class="flex flex-col items-center gap-1 text-[#a0a5ab] hover:text-white transition-colors cursor-pointer group"
        >
          <span class="text-xl group-hover:scale-105 transition-transform"
            >📊</span
          >
          <span class="text-[12px]">Сравнение</span>
        </button>

        <!-- Избранное -->
        <button
          class="flex flex-col items-center gap-1 text-[#a0a5ab] hover:text-white transition-colors cursor-pointer group"
        >
          <span class="text-xl group-hover:scale-105 transition-transform"
            >❤️</span
          >
          <span class="text-[12px]">Избранное</span>
        </button>

        <!-- Корзина -->
        <button
          class="flex flex-col items-center gap-1 text-[#a0a5ab] hover:text-white transition-colors cursor-pointer group"
        >
          <span class="text-xl group-hover:scale-105 transition-transform"
            >🛍️</span
          >
          <span class="text-[12px]">Корзина</span>
        </button>

        <!-- Войти -->
        <button
          class="flex flex-col items-center gap-1 text-[#a0a5ab] hover:text-white transition-colors cursor-pointer group"
        >
          <span class="text-xl group-hover:scale-105 transition-transform"
            >👤</span
          >
          <span class="text-[12px]">Войти</span>
        </button>
      </div>
    </div>
  </section>
</template>

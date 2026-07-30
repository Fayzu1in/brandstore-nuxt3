<template>
  <header
    class="w-full bg-[#13181e] text-[13px] sm:text-[14px] text-[#ffffff] font-sans antialiased py-[6px]"
  >
    <div
      class="mx-auto flex h-10 max-w-[1481px] w-full items-center justify-between px-4 sm:px-[24px]"
    >
      <!-- Левая часть -->
      <div class="flex items-center gap-3 sm:gap-5">
        <span
          class="flex items-center gap-1 text-[#a0a5ab] cursor-default whitespace-nowrap"
        >
          <span>📍</span>
          <!-- Сокращаем или скрываем название страны на совсем маленьких экранах при необходимости -->
          <span class="inline">Узбекистан</span>
        </span>

        <!-- Навигация (скрыта на мобилке, видна от md / 768px) -->
        <nav class="hidden md:flex gap-4">
          <NuxtLink
            to="/delivery"
            class="text-[#a0a5ab] hover:text-white transition-colors"
            active-class="!text-white"
          >
            Доставка
          </NuxtLink>
          <NuxtLink
            to="/articles"
            class="text-[#a0a5ab] hover:text-white transition-colors"
            active-class="!text-white"
          >
            Техноблог
          </NuxtLink>
        </nav>
      </div>

      <!-- Правая часть -->
      <div class="flex items-center gap-3 sm:gap-5">
        <div class="flex gap-5">
          <a
            href="tel:+998712059393"
            class="flex items-center text-[#a0a5ab] hover:text-white transition-colors"
            title="Позвонить"
          >
            <!-- Полный текст для десктопа -->
            <span class="hidden sm:inline">
              <span class="text-[#6c727a] mr-1">Оформить заказ</span
              >71-205-93-93
            </span>

            <!-- Иконка трубки + короткий номер для мобилки -->
            <span
              class="sm:hidden flex items-center gap-1 text-white font-medium"
            >
              <svg
                class="w-4 h-4 text-[#a0a5ab]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              71-205-93-93
            </span>
          </a>
        </div>

        <button
          class="rounded border border-[#3a3f45] px-2 py-0.5 text-xs sm:text-sm text-white hover:bg-[#3a3f45] transition-colors cursor-pointer"
        >
          Ru
        </button>
      </div>
    </div>
  </header>
</template>

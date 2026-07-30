<template>
  <div
    class="bg-white rounded-2xl p-4 flex flex-col justify-between min-h-[380px] animate-pulse select-none"
  >
    <div>
      <!-- Бейдж (Новинка/Скидка) -->
      <div class="mb-3 flex justify-between">
        <div class="h-5 w-16 bg-gray-200 rounded-[14px]"></div>
      </div>

      <!-- Картинка товара -->
      <div
        class="w-full h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center"
      >
        <div class="w-24 h-24 bg-gray-200 rounded-lg"></div>
      </div>

      <!-- Категория -->
      <div class="h-3 w-20 bg-gray-200 rounded mx-auto mb-2"></div>

      <!-- Название товара (2 строки) -->
      <div class="space-y-1.5 mb-3">
        <div class="h-3.5 w-3/4 bg-gray-200 rounded mx-auto"></div>
        <div class="h-3.5 w-1/2 bg-gray-200 rounded mx-auto"></div>
      </div>

      <!-- Статус наличия -->
      <div class="flex items-center justify-center gap-1.5 mb-1">
        <div class="w-2 h-2 bg-gray-200 rounded-full"></div>
        <div class="h-3 w-28 bg-gray-200 rounded"></div>
      </div>
    </div>

    <!-- Подвал: Цена и Кнопки -->
    <div
      class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100"
    >
      <!-- Блок цены -->
      <div class="flex flex-col gap-1">
        <div class="h-5 w-24 bg-gray-200 rounded"></div>
        <div class="h-3 w-12 bg-gray-200 rounded"></div>
      </div>

      <!-- Кнопки действий -->
      <div class="flex gap-2">
        <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  </div>
</template>

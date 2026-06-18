<template>
  <div class="mx-auto max-w-[1481px] w-full px-[25px] pt-[30px]">
    <!-- 1. ХЛЕБНЫЕ КРОШКИ (Роутинг слева сверху) -->
    <nav class="text-[13px] text-gray-400 mb-6">
      <ul class="flex items-center gap-2">
        <li>
          <NuxtLink to="/" class="hover:text-white transition-colors"
            >Главная</NuxtLink
          >
        </li>
        <li>/</li>
        <li>
          <NuxtLink to="/catalog" class="hover:text-white transition-colors"
            >Смартфоны и гаджеты</NuxtLink
          >
        </li>
        <li>/</li>
        <li class="text-gray-200 truncate max-w-[200px]">Планшеты</li>
      </ul>
    </nav>

    <!-- ОСНОВНАЯ СЕКЦИЯ: РАЗДЕЛЕНИЕ НА ДВЕ ЧАСТИ (ЛЕВО / ПРАВО) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <!-- ================= ЛЕВАЯ СТОРОНА ================= -->
      <div class="flex gap-4">
        <!-- Миниатюры (вертикальный ряд слева от главного фото) -->
        <div class="flex flex-col gap-2 w-20">
          <button
            v-for="i in 4"
            :key="i"
            class="w-full h-20 bg-[#1A1D21] border border-gray-800 rounded-xl p-2 flex items-center justify-center hover:border-gray-600 transition-colors"
          >
            <img
              src="#"
              alt="thumb"
              class="max-h-full object-contain opacity-60 hover:opacity-100"
            />
          </button>
        </div>

        <!-- Главное изображение товара -->
        <div
          class="flex-1 bg-white rounded-2xl p-6 min-h-[450px] flex items-center justify-center"
        >
          <img
            src="#"
            alt="Главное фото товара"
            class="max-w-full max-h-[400px] object-contain"
          />
        </div>
      </div>

      <!-- ================= ПРАВАЯ СТОРОНА ================= -->
      <div class="flex flex-col">
        <!-- Верхняя строчка: Бренд и Кнопки действий -->
        <div class="flex items-center justify-between mb-4">
          <!-- Логотип/название бренда -->
          <div class="h-8 flex items-center">
            <!-- <img src="#" alt="Logo" class="max-h-full object-contain" /> -->
            <span class="text-lg font-bold tracking-wide">HUAWEI</span>
          </div>

          <!-- Кнопки: нравится, сравнение, поделиться -->
          <div class="flex items-center gap-3 text-gray-400">
            <button
              class="hover:text-[#E30909] transition-colors p-1.5 bg-[#1A1D21] rounded-full"
            >
              ❤️
            </button>
            <button
              class="hover:text-blue-500 transition-colors p-1.5 bg-[#1A1D21] rounded-full"
            >
              📊
            </button>
            <button
              class="hover:text-green-500 transition-colors p-1.5 bg-[#1A1D21] rounded-full"
            >
              🔗
            </button>
          </div>
        </div>

        <!-- Статус товара -->
        <div class="mb-4">
          <span
            class="inline-flex items-center gap-1.5 text-[13px] text-[#02B513] bg-[#02B513]/10 px-3 py-1 rounded-full font-medium"
          >
            <span class="w-2 h-2 bg-[#02B513] rounded-full"></span>
            В наличии
          </span>
        </div>

        <!-- Название товара -->
        <h1 class="text-2xl font-semibold leading-tight mb-6 text-white">
          Планшет Huawei MatePad 11.5S (2026) с клавиатурой + PaperMatte Wi-Fi
          серый космос
        </h1>

        <!-- Блок цены и кэшбека -->
        <div
          class="flex items-end justify-between bg-[#1A1D21] p-4 rounded-xl mb-6 border border-gray-800"
        >
          <div>
            <div class="text-[13px] text-gray-400 line-through mb-0.5">
              45 990 сум
            </div>
            <div class="text-3xl font-bold text-white">33 290 сум</div>
          </div>
          <!-- Кэшбек -->
          <div
            class="bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[13px] px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium"
          >
            🪙 +1 665 кэшбек
          </div>
        </div>

        <!-- Кнопки действия (Добавить в корзину / Оформить) -->
        <div class="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            class="flex-1 bg-[#E30909] hover:bg-[#c20808] text-white font-medium py-3.5 px-6 rounded-xl transition-colors text-center cursor-pointer"
          >
            Добавить в корзину
          </button>
          <button
            class="flex-1 bg-[#1A1D21] border border-gray-700 hover:border-gray-500 text-white font-medium py-3.5 px-6 rounded-xl transition-colors text-center cursor-pointer"
          >
            Оформить в 1 клик
          </button>
        </div>

        <!-- Кнопка купить в рассрочку -->
        <button
          class="w-full bg-[#24292F] border border-gray-800 hover:border-gray-700 text-white p-4 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
        >
          <div class="text-left">
            <span
              class="block text-[12px] text-gray-400 uppercase tracking-wider font-semibold"
              >Рассрочка</span
            >
            <span class="text-md font-bold text-green-400"
              >от 8 324 сум / мес</span
            >
          </div>
          <span class="text-gray-400 text-xl">❯</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Скрипты для логики (выбор картинок, добавление в корзину) добавим позже
</script>

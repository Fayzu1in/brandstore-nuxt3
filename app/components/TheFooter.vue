<template>
  <footer class="w-full bg-[#0b0e12] text-[#a0a5ab] relative mt-20">
    <div
      class="absolute top-0 left-0 w-full h-[2px] bg-[#E30909] shadow-[0_-4px_20px_rgba(227,9,9,0.8)]"
    ></div>

    <div class="mx-auto max-w-[1481px] w-full px-[25px] pt-12 pb-8">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-gray-800/60 pb-10"
      >
        <div class="lg:col-span-1 flex flex-col gap-4">
          <NuxtLink
            to="/"
            class="text-white text-[22px] font-black tracking-wider uppercase"
          >
            BRAND<span class="text-[#E30909]">STORE</span>
          </NuxtLink>

          <div class="flex flex-col gap-1 mt-2">
            <a
              href="tel:+998712059393"
              class="text-white text-[18px] font-bold hover:text-[#E30909] transition-colors"
            >
              +998 71 205 93 93
            </a>
            <p class="text-[12px] text-[#71767c]">
              График работы колл-центра:<br />
              Ежедневно, с 10:00 до 19:00
            </p>
          </div>

          <div class="flex flex-col gap-1">
            <a
              href="mailto:info@brandstore.uz"
              class="text-[14px] text-gray-300 hover:text-[#E30909] transition-colors"
            >
              info@brandstore.uz
            </a>
          </div>

          <div class="flex items-center gap-4 mt-2">
            <a
              href="#"
              class="w-8 h-8 rounded-full bg-[#1c2229] flex items-center justify-center text-white hover:bg-[#E30909] transition-colors"
              title="Telegram"
            >
              <span class="text-[14px]">TG</span>
            </a>
            <a
              href="#"
              class="w-8 h-8 rounded-full bg-[#1c2229] flex items-center justify-center text-white hover:bg-[#E30909] transition-colors"
              title="Facebook"
            >
              <span class="text-[14px]">FB</span>
            </a>
            <a
              href="#"
              class="w-8 h-8 rounded-full bg-[#1c2229] flex items-center justify-center text-white hover:bg-[#E30909] transition-colors"
              title="YouTube"
            >
              <span class="text-[14px]">YT</span>
            </a>
            <a
              href="#"
              class="w-8 h-8 rounded-full bg-[#1c2229] flex items-center justify-center text-white hover:bg-[#E30909] transition-colors"
              title="Instagram"
            >
              <span class="text-[14px]">IG</span>
            </a>
          </div>
        </div>

        <div>
          <h3
            class="text-white font-semibold text-[15px] mb-4 uppercase tracking-wider cursor-default"
          >
            Категории
          </h3>
          <ul class="flex flex-col gap-2.5 text-[14px]">
            <li>
              <NuxtLink
                to="/catalog/monoblocks"
                class="hover:text-white transition-colors"
                >Моноблоки</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/catalog/computers"
                class="hover:text-white transition-colors"
                >Компьютеры</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/catalog/videocards"
                class="hover:text-white transition-colors"
                >Видеокарты</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/catalog/monitors"
                class="hover:text-white transition-colors"
                >Мониторы</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/catalog/mfu"
                class="hover:text-white transition-colors"
                >МФУ</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/catalog/phones"
                class="hover:text-white transition-colors"
                >Телефоны</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h3
            class="text-white font-semibold text-[15px] mb-4 uppercase tracking-wider cursor-default"
          >
            Интернет магазин
          </h3>
          <ul class="flex flex-col gap-2.5 text-[14px]">
            <li>
              <NuxtLink to="/privacy" class="hover:text-white transition-colors"
                >Политика конфиденциальности</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-white transition-colors"
                >О нашей компании</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/loyalty" class="hover:text-white transition-colors"
                >Правила программы лояльности</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/public-offer"
                class="hover:text-white transition-colors"
                >Публичная оферта</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/contacts"
                class="hover:text-white transition-colors"
                >Контакты</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/shops"
                class="hover:text-white transition-colors font-medium text-[#E30909]"
                >НАШИ МАГАЗИНЫ</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h3
            class="text-white font-semibold text-[15px] mb-4 uppercase tracking-wider cursor-default"
          >
            Покупателям
          </h3>
          <ul class="flex flex-col gap-2.5 text-[14px]">
            <li>
              <NuxtLink
                to="/installment"
                class="hover:text-white transition-colors"
                >Покупка в рассрочку</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/delivery"
                class="hover:text-white transition-colors"
                >Доставка и оплата</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/cashback"
                class="hover:text-white transition-colors"
                >Правила покупок с кэшбека</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/return" class="hover:text-white transition-colors"
                >Возврат / обмен</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/coupons" class="hover:text-white transition-colors"
                >Правила пользования купонами</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h3
            class="text-white font-semibold text-[15px] mb-2 uppercase tracking-wider cursor-default"
          >
            Способы оплаты
          </h3>
          <div class="grid grid-cols-2 gap-2">
            <div
              class="bg-[#1c2229] border border-gray-800/40 rounded-xl p-2 h-[42px] flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <span
                class="text-[11px] font-bold text-white tracking-widest cursor-default"
                >HUMO</span
              >
            </div>
            <div
              class="bg-[#1c2229] border border-gray-800/40 rounded-xl p-2 h-[42px] flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <span class="text-[11px] font-bold text-[#8c3efc] cursor-default"
                >uzum bank</span
              >
            </div>
            <div
              class="bg-[#1c2229] border border-gray-800/40 rounded-xl p-2 h-[42px] flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <span
                class="text-[11px] font-bold text-[#00a0e3] tracking-widest cursor-default"
                >UZCARD</span
              >
            </div>
            <div
              class="bg-[#1c2229] border border-gray-800/40 rounded-xl p-2 h-[42px] flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <span class="text-[11px] font-bold text-[#ffbf00] cursor-default"
                >alif shop</span
              >
            </div>
            <div
              class="bg-[#1c2229] border border-gray-800/40 rounded-xl p-2 h-[42px] flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <span
                class="text-[12px] font-black italic text-[#1a1f71] cursor-default"
                >VISA</span
              >
            </div>
            <div
              class="bg-[#1c2229] border border-gray-800/40 rounded-xl p-2 h-[42px] flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <span class="text-[11px] font-bold text-[#00bfa5] cursor-default"
                >payme</span
              >
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col md:flex-row items-center justify-between pt-6 text-[12px] text-[#71767c]"
      >
        <p>© 2020-2026 OOO "BRANDSTORE". Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Компонент полностью статичен, но готов к интеграции роутинга через NuxtLink
</script>

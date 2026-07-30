<template>
  <header
    class="w-full bg-[#13181e] text-[14px] text-[#ffffff] font-sans antialiased pt-[6px] pb-[6px]"
  >
    <div
      class="mx-auto flex h-10 max-w-[1481px] w-full items-center justify-between px-[24px]"
    >
      <div class="flex items-center gap-5">
        <span class="flex items-center gap-1 text-[#a0a5ab] cursor-default">
          <span>📍</span> Узбекистан
        </span>

        <nav class="flex gap-4">
          <NuxtLink
            to="/delivery"
            class="text-[#a0a5ab] hover:text-white transition-colors"
            active-class="!text-white"
            >Доставка</NuxtLink
          >
          <!-- <NuxtLink
            to="/shops"
            class="text-[#a0a5ab] hover:text-white transition-colors"
            >Магазины</NuxtLink
          > -->
          <NuxtLink
            to="/articles"
            class="text-[#a0a5ab] hover:text-white transition-colors"
            active-class="!text-white"
            >Техноблог</NuxtLink
          >
        </nav>
      </div>

      <!-- Правая часть -->
      <div class="flex items-center gap-5">
        <div class="flex gap-5">
          <!-- <a
            href="tel:88001005586"
            class="text-[#a0a5ab] hover:text-white transition-colors"
          >
            <span class="text-[#6c727a] mr-1">Служба поддержки</span>8 (800)
            100-55-86
          </a> -->
          <a
            href="tel:998712059393"
            class="text-[#a0a5ab] hover:text-white transition-colors"
          >
            <span class="text-[#6c727a] mr-1">Оформить заказ</span>71-205-93-93
          </a>
        </div>

        <button
          class="rounded border border-[#3a3f45] px-2 py-0.5 text-white hover:bg-[#3a3f45] transition-colors cursor-pointer"
        >
          Ru
        </button>
      </div>
    </div>
  </header>
</template>

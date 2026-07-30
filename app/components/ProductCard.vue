<template>
  <NuxtLink
    :to="`/productPage/${product.slug}`"
    class="bg-[#FFFF] rounded-2xl p-4 flex flex-col justify-between min-h-[380px] group transition-all duration-300 hover:shadow-lg hover:shadow-black/30 cursor-pointer"
  >
    <div>
      <div
        v-if="hasDiscount"
        class="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-[#E30909] text-[11px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm"
      >
        <Icon name="mdi:tag-outline" class="text-xs" />
        <span>Скидка</span>
      </div>
      <div class="mb-3">
        <span
          v-if="product.is_new"
          class="inline-block text-[11px] font-medium px-2 py-0.5 rounded-[14px] bg-[#02B513] text-white"
        >
          Новинка
        </span>
      </div>

      <div
        class="w-full h-40 flex items-center justify-center bg-white rounded-xl overflow-hidden mb-4 p-2"
      >
        <img
          :src="product.images?.[0]?.url"
          alt=""
          class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>

      <div class="text-[12px] text-[#a0a5ab] mb-1 text-center">
        {{ product.class?.name }}
      </div>

      <h4
        class="text-[14px] font-medium mb-3 text-[#13181e] text-center leading-tight h-9 line-clamp-2 group-hover:text-[#E30909] transition-colors"
      >
        {{ product.model || "Название товара" }}
      </h4>

      <!-- Статусы наличия -->
      <div class="text-[12px] mb-1 flex items-center justify-center gap-1.5">
        <!-- 1. Если bs_quant >= 1 -> В магазине -->
        <template v-if="(product.random_shop?.bs_quant ?? 0) >= 1">
          <span class="w-[7px] h-[7px] bg-[#02B513] rounded-full"></span>
          <span class="text-[#a0a5ab]"
            >В магазине ( {{ product.random_shop?.bs_quant }}шт. )</span
          >
        </template>

        <!-- 2. Если bs_quant == 0, но quantity > 0 -> На складе -->
        <template v-else-if="(product.random_shop?.quantity ?? 0) > 0">
          <span class="w-[7px] h-[7px] bg-[#E5A93C] rounded-full"></span>
          <span class="text-[#a0a5ab]">На складе (сегодня/завтра)</span>
        </template>

        <!-- 3. Если и там и там 0 -> Под заказ -->
        <template v-else>
          <span class="w-[7px] h-[7px] bg-[#a0a5ab] rounded-full"></span>
          <span class="text-[#a0a5ab]">Под заказ</span>
        </template>
      </div>
    </div>

    <div class="flex items-center justify-between mt-4 pt-3 border-gray-800">
      <!-- Фиксированная минимальная высота исключает "пляску" карточек в сетке -->
      <!-- Оборачиваем блок в relative -->
      <div class="relative flex flex-col justify-end min-h-[42px]">
        <!-- Старая цена (зачёркнутая) — абсолют сверху -->
        <div
          v-if="oldPrice"
          class="absolute -top-3.5 left-0 text-[11px] font-medium text-gray-400 line-through decoration-[#E30909]/80 leading-none whitespace-nowrap pointer-events-none"
        >
          {{ formatPrice(oldPrice) }}
          <span class="text-[10px] no-underline">сум</span>
        </div>

        <!-- Актуальная цена (всегда остаётся на своём месте) -->
        <div v-if="currentPrice" class="flex flex-col items-start leading-none">
          <!-- Крупное число -->
          <span
            class="text-[15px] sm:text-[17px] font-bold text-[#13181e] tracking-tight"
          >
            {{ formatPrice(currentPrice) }}
          </span>

          <!-- Мелкая надпись "сум / НДС" -->
          <span
            class="text-[10px] pt-[3px] sm:text-[11px] font-normal text-gray-400 mt-0.5"
          >
            сум / НДС
          </span>
        </div>

        <!-- По запросу -->
        <div v-else class="text-[14px] font-semibold text-gray-600">
          По запросу
        </div>
      </div>
      <div class="flex gap-2">
        <button
          class="w-8 h-8 flex items-center justify-center border-[1px] bg-[#fff] text-[grey] rounded-full hover:bg-[#E30909] hover:text-white transition-colors cursor-pointer"
        >
          <Icon
            name="mdi:align-horizontal-right"
            class="text-l transition-transform"
          />
        </button>
        <button
          class="w-8 h-8 flex items-center justify-center border-[1px] bg-[#fff] text-[grey] rounded-full hover:bg-[#E30909] hover:text-white transition-colors cursor-pointer"
        >
          <Icon name="mdi:heart" class="text-l transition-transform" />
        </button>
        <button
          class="w-8 h-8 flex items-center justify-center bg-[#fff] border-[1px] text-[grey] rounded-full hover:bg-[#E30909] hover:text-white transition-colors cursor-pointer"
        >
          <Icon name="mdi:cart" class="text-l transition-transform" />
        </button>
      </div>
    </div>
    <!-- <div class="flex items-center gap-1 text-[11px] text-gray-400 pt-1">
      <Icon
        name="mdi:check-circle-outline"
        class="text-xs text-blue-500 flex-shrink-0"
      />
      <span>Цена включает НДС</span>
    </div> -->
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

const shopData = computed(() => props.product?.random_shop);
const hasDiscount = computed(() => !!shopData.value?.discount?.price);

const currentPrice = computed(() => {
  if (hasDiscount.value) {
    return shopData.value?.discount?.price;
  }
  return shopData.value?.price || null;
});

const oldPrice = computed(() => {
  if (hasDiscount.value) {
    return shopData.value?.price || null;
  }
  return null;
});

const formatPrice = (val?: number | string | null) => {
  if (!val) return "";
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
</script>

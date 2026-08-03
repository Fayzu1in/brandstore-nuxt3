<script setup lang="ts">
import { computed } from "vue";
import { useFavoritesStore } from "~/stores/useFavoritesStore";
import { useCartStore } from "~/stores/useCartStore";
const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

// 1. Адаптер названия (поиск даёт .name, каталог даёт .model)
const productTitle = computed(() => {
  return props.product?.name || props.product?.model || "Название товара";
});

// 2. Адаптер изображения (картинка может быть в images[0].url, image или photo)
const imageUrl = computed(() => {
  return (
    props.product?.images?.[0]?.url ||
    props.product?.image ||
    props.product?.photo ||
    "/placeholder.png"
  );
});

// 3. Адаптер категории (class.name или category.name)
const categoryName = computed(() => {
  return props.product?.category?.name || props.product?.class?.name || "Товар";
});

// 4. Магазинные данные и Цены
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
<template>
  <NuxtLink
    :to="`/productPage/${product.slug}`"
    class="relative bg-[#FFFF] rounded-2xl p-4 flex flex-col justify-between min-h-[380px] group transition-all duration-300 hover:shadow-lg hover:shadow-black/30 cursor-pointer"
  >
    <div>
      <!-- Плашка скидки -->
      <div
        v-if="hasDiscount"
        class="absolute top-3 left-3 z-10 inline-flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-[#E30909] text-[11px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm"
      >
        <Icon name="mdi:tag-outline" class="text-xs" />
        <span>Скидка</span>
      </div>

      <!-- Новинка -->
      <div class="mb-3">
        <span
          v-if="product.is_new"
          class="inline-block text-[11px] font-medium px-2 py-0.5 rounded-[14px] bg-[#02B513] text-white"
        >
          Новинка
        </span>
      </div>

      <!-- Картинка -->
      <div
        class="w-full h-40 flex items-center justify-center bg-white rounded-xl overflow-hidden mb-4 p-2"
      >
        <img
          :src="imageUrl"
          :alt="productTitle"
          class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>

      <!-- Категория / Класс -->
      <div class="text-[12px] text-[#a0a5ab] mb-1 text-center truncate">
        {{ categoryName }}
      </div>

      <!-- Название товара -->
      <h4
        class="text-[14px] font-medium mb-3 text-[#13181e] text-center leading-tight h-9 line-clamp-2 group-hover:text-[#E30909] transition-colors"
      >
        {{ productTitle }}
      </h4>

      <!-- Статус наличия -->
      <div class="text-[12px] mb-1 flex items-center justify-center gap-1.5">
        <template v-if="(shopData?.bs_quant ?? 0) >= 1">
          <span class="w-[7px] h-[7px] bg-[#02B513] rounded-full"></span>
          <span class="text-[#a0a5ab]">На витрине</span>
        </template>

        <template v-else-if="(shopData?.quantity ?? 0) > 0">
          <span class="w-[7px] h-[7px] bg-[#E5A93C] rounded-full"></span>
          <span class="text-[#a0a5ab]">На складе (сегодня/завтра)</span>
        </template>

        <template v-else>
          <span class="w-[7px] h-[7px] bg-[#a0a5ab] rounded-full"></span>
          <span class="text-[#a0a5ab]">Под заказ</span>
        </template>
      </div>
    </div>

    <!-- Футер карточки (Цена и Кнопки) -->
    <div class="flex items-center justify-between mt-4 pt-3 border-gray-800">
      <div class="relative flex flex-col justify-end min-h-[42px]">
        <div
          v-if="oldPrice"
          class="absolute -top-3.5 left-0 text-[11px] font-medium text-gray-400 line-through decoration-[#E30909]/80 leading-none whitespace-nowrap pointer-events-none"
        >
          {{ formatPrice(oldPrice) }}
          <span class="text-[10px] no-underline">сум</span>
        </div>

        <div v-if="currentPrice" class="flex flex-col items-start leading-none">
          <span
            class="text-[15px] sm:text-[17px] font-bold text-[#13181e] tracking-tight"
          >
            {{ formatPrice(currentPrice) }}
          </span>

          <span
            class="text-[10px] pt-[3px] sm:text-[11px] font-normal text-gray-400 mt-0.5"
          >
            сум / НДС
          </span>
        </div>

        <div v-else class="text-[14px] font-semibold text-gray-600">
          По запросу
        </div>
      </div>

      <!-- Экшн-кнопки -->
      <div class="flex gap-2" @click.prevent>
        <button
          type="button"
          class="w-8 h-8 flex items-center justify-center border-[1px] bg-[#fff] text-[grey] rounded-full hover:bg-[#E30909] hover:text-white transition-colors cursor-pointer"
        >
          <Icon
            name="mdi:align-horizontal-right"
            class="text-l transition-transform"
          />
        </button>
        <button
          @click.prevent.stop="favoritesStore.toggleFavorite(product as any)"
          type="button"
          :class="[
            'w-8 h-8 flex items-center justify-center border transition-all cursor-pointer rounded-full',
            favoritesStore.isFavorite(product.id)
              ? 'bg-[#E30909] text-white border-[#E30909]'
              : 'bg-[#fff] text-gray-400 border-gray-200 hover:bg-[#E30909] hover:text-white hover:border-[#E30909]',
          ]"
        >
          <Icon
            :name="
              favoritesStore.isFavorite(product.id)
                ? 'mdi:heart'
                : 'mdi:heart-outline'
            "
            class="text-lg transition-transform active:scale-125"
          />
        </button>
        <button
          @click.prevent.stop="cartStore.addToCart(product)"
          type="button"
          :class="[
            'w-8 h-8 flex items-center justify-center border transition-all cursor-pointer rounded-full',
            cartStore.isInCart(product?.id)
              ? 'bg-[#E30909] text-white border-[#E30909]'
              : 'bg-[#fff] text-gray-400 border-gray-200 hover:bg-[#E30909] hover:text-white hover:border-[#E30909]',
          ]"
          :title="
            cartStore.isInCart(product?.id) ? 'В корзине' : 'Добавить в корзину'
          "
        >
          <Icon
            :name="
              cartStore.isInCart(product?.id)
                ? 'mdi:cart-check'
                : 'mdi:cart-outline'
            "
            class="text-lg transition-transform active:scale-125"
          />
        </button>
      </div>
    </div>
  </NuxtLink>
</template>

<template>
  <div class="mx-auto max-w-[1481px] w-full px-[25px] pt-[30px] text-white">
    <!-- Индикатор загрузки -->
    <div v-if="pending" class="py-20 text-center text-gray-400">
      Загрузка информации о товаре...
    </div>

    <!-- Сообщение об ошибке -->
    <div v-else-if="error || !product" class="py-20 text-center text-red-500">
      Товар не найден или произошла ошибка загрузки.
    </div>

    <!-- Основной контент товара -->
    <template v-else>
      <!-- 1. ХЛЕБНЫЕ КРОШКИ -->
      <nav class="text-[13px] text-gray-400 mb-6">
        <ul class="flex items-center gap-2 flex-wrap">
          <li>
            <NuxtLink to="/" class="hover:text-white transition-colors"
              >Главная</NuxtLink
            >
          </li>
          <li>/</li>
          <li v-if="primaryCategory">
            <NuxtLink
              :to="`/catalog/${primaryCategory.slug}`"
              class="hover:text-white transition-colors"
            >
              {{ primaryCategory.name }}
            </NuxtLink>
          </li>
          <li v-if="primaryCategory">/</li>
          <li class="text-gray-200 truncate max-w-[300px]">
            {{ product.name }}
          </li>
        </ul>
      </nav>

      <!-- ОСНОВНАЯ СЕКЦИЯ: ЛЕВО / ПРАВО -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <!-- ================= ЛЕВАЯ СТОРОНА (ГАЛЕРЕЯ) ================= -->
        <div class="flex gap-4 flex-col-reverse sm:flex-row">
          <!-- Миниатюры -->
          <div
            v-if="images.length > 1"
            class="flex sm:flex-col gap-2 w-full sm:w-20 overflow-x-auto"
          >
            <button
              v-for="(img, idx) in images"
              :key="idx"
              @click="activeImage = img.url"
              class="w-20 h-20 bg-[#1A1D21] border rounded-xl p-2 flex-shrink-0 flex items-center justify-center transition-colors cursor-pointer"
              :class="
                activeImage === img.url
                  ? 'border-[#E30909]'
                  : 'border-gray-800 hover:border-gray-600'
              "
            >
              <img
                :src="img.types?.small_default || img.url"
                :alt="product.name"
                class="max-h-full max-w-full object-contain"
                :class="{ 'opacity-60': activeImage !== img.url }"
              />
            </button>
          </div>

          <!-- Главное изображение -->
          <div
            class="flex-1 bg-white rounded-2xl p-6 min-h-[350px] sm:min-h-[450px] flex items-center justify-center"
          >
            <img
              :src="activeImage"
              :alt="product.name"
              class="max-w-full max-h-[400px] object-contain"
            />
          </div>
        </div>

        <!-- ================= ПРАВАЯ СТОРОНА (ИНФО) ================= -->
        <div class="flex flex-col">
          <!-- Верхняя строчка: Бренд и Кнопки действий -->
          <div class="flex items-center justify-between mb-4">
            <!-- Логотип/название бренда -->
            <div class="h-8 flex items-center">
              <img
                v-if="product.brand?.image?.url"
                :src="product.brand.image.url"
                :alt="product.brand.name"
                class="max-h-full object-contain"
              />
              <span v-else class="text-lg font-bold tracking-wide text-white">
                {{ product.brand?.name || "Бренд" }}
              </span>
            </div>

            <!-- Кнопки действий -->
            <div class="flex items-center gap-3 text-gray-400">
              <!-- Избранное -->
              <button
                class="hover:text-[#E30909] transition-colors p-2.5 bg-[#1A1D21] rounded-full cursor-pointer flex items-center justify-center group"
                title="В избранное"
              >
                <Icon
                  name="mdi:heart-outline"
                  class="text-xl transition-transform group-hover:scale-110"
                />
              </button>

              <!-- Сравнение -->
              <button
                class="hover:text-blue-500 transition-colors p-2.5 bg-[#1A1D21] rounded-full cursor-pointer flex items-center justify-center group"
                title="Сравнить"
              >
                <Icon
                  name="mdi:compare"
                  class="text-xl transition-transform group-hover:scale-110"
                />
              </button>

              <!-- Поделиться -->
              <button
                class="hover:text-green-500 transition-colors p-2.5 bg-[#1A1D21] rounded-full cursor-pointer flex items-center justify-center group"
                title="Поделиться"
              >
                <Icon
                  name="mdi:share-variant-outline"
                  class="text-xl transition-transform group-hover:scale-110"
                />
              </button>
            </div>
          </div>

          <!-- Динамический статус наличия -->
          <div class="mb-4">
            <!-- 1. В магазине -->
            <span
              v-if="(shopData?.bs_quant ?? 0) >= 1"
              class="inline-flex items-center gap-1.5 text-[13px] text-[#02B513] bg-[#02B513]/10 px-3 py-1 rounded-full font-medium"
            >
              <span class="w-2 h-2 bg-[#02B513] rounded-full"></span>
              В магазине ({{ shopData.bs_quant }} шт.)
            </span>

            <!-- 2. На складе -->
            <span
              v-else-if="(shopData?.quantity ?? 0) > 0"
              class="inline-flex items-center gap-1.5 text-[13px] text-[#E5A93C] bg-[#E5A93C]/10 px-3 py-1 rounded-full font-medium"
            >
              <span class="w-2 h-2 bg-[#E5A93C] rounded-full"></span>
              На складе (сегодня/завтра)
            </span>

            <!-- 3. Под заказ -->
            <span
              v-else
              class="inline-flex items-center gap-1.5 text-[13px] text-gray-400 bg-gray-800 px-3 py-1 rounded-full font-medium"
            >
              <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
              Под заказ
            </span>
          </div>

          <!-- Название товара -->
          <h1
            class="text-xl sm:text-2xl font-semibold leading-tight mb-6 text-white"
          >
            {{ product.name }}
          </h1>

          <!-- Блок цены и кэшбека -->
          <div
            class="flex flex-col sm:flex-row sm:items-end justify-between bg-[#1A1D21] p-4 sm:p-5 rounded-xl mb-6 border border-gray-800 gap-4"
          >
            <div class="flex flex-col gap-1">
              <!-- Старая цена (увеличен шрифт и яркая линия зачеркивания) -->
              <div
                v-if="oldPrice"
                class="text-base font-medium text-gray-400 line-through decoration-[#E30909]/80 decoration-2"
              >
                {{ formatPrice(oldPrice) }} сум
              </div>

              <!-- Актуальная цена -->
              <div
                class="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2"
              >
                <span>
                  {{
                    currentPrice
                      ? `${formatPrice(currentPrice)} сум`
                      : "Цена по запросу"
                  }}
                </span>

                <!-- Огонек при наличии скидки -->
                <span
                  v-if="hasDiscount"
                  class="inline-flex items-center justify-center bg-orange-500/10 text-orange-500 p-1 rounded-md text-xl"
                  title="Скидка"
                >
                  <Icon name="mdi:fire" class="animate-pulse" />
                </span>
              </div>

              <!-- Гарантия и НДС -->
              <div
                class="flex items-center gap-3 text-[12px] text-gray-400 mt-1 flex-wrap"
              >
                <!-- Гарантия из random_shop -->
                <span
                  v-if="shopData?.warranty_period"
                  class="flex items-center gap-1 text-gray-300"
                >
                  <Icon
                    name="mdi:shield-check-outline"
                    class="text-base text-green-500"
                  />
                  Гарантия {{ shopData.warranty_period }}
                </span>

                <span v-if="shopData?.warranty_period" class="text-gray-600"
                  >•</span
                >

                <!-- Уведомление про НДС -->
                <span class="flex items-center gap-1 text-gray-400">
                  <Icon
                    name="mdi:check-circle-outline"
                    class="text-base text-blue-400"
                  />
                  Цена включает НДС
                </span>
              </div>
            </div>

            <!-- Кэшбек -->
            <div
              v-if="product.cashback"
              class="self-start sm:self-end bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[13px] px-3.5 py-2 rounded-lg flex items-center gap-1.5 font-medium"
            >
              <Icon
                name="mdi:wallet-outline"
                class="text-base text-amber-400 flex-shrink-0"
              />
              <span>+{{ formatPrice(product.cashback) }} сум кэшбек</span>
            </div>
          </div>

          <!-- Кнопки действия -->
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

          <!-- Кнопка рассрочки -->
          <button
            v-if="monthlyPrice"
            class="w-full bg-[#24292F] border border-gray-800 hover:border-gray-700 text-white p-4 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
          >
            <div class="text-left">
              <span
                class="block text-[12px] text-gray-400 uppercase tracking-wider font-semibold"
              >
                Рассрочка
              </span>
              <span class="text-md font-bold text-green-400">
                от {{ monthlyPrice.toLocaleString() }} сум / мес
              </span>
            </div>
            <span class="text-gray-400 text-xl">❯</span>
          </button>
        </div>
      </div>

      <!-- Дополнительно: Описание товара -->
      <div
        v-if="product.description"
        class="mt-12 border-t border-gray-800 pt-8"
      >
        <h2 class="text-xl font-bold mb-4">Описание товара</h2>
        <div
          class="prose prose-invert text-gray-300 text-sm max-w-none leading-relaxed"
          v-html="product.description"
        ></div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { api } from "~/utils/api";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

// Запрашиваем данные через Nuxt useAsyncData для корректной работы SSR

const {
  data: product,
  pending,
  error,
} = await useAsyncData(
  () => `product-${route.params.slug}`,
  () => api.getProductBySlug(route.params.slug as string),
  {
    watch: [() => route.params.slug],
  },
);
console.log("product", product.value);

// Активное изображение в галерее
const activeImage = ref<string>("");

// Картинки товара
const images = computed(() => product.value?.images || []);

// Устанавливаем главное фото при получении данных
watchEffect(() => {
  if (images.value.length > 0) {
    activeImage.value = images.value[0].url;
  }
});

const productData = computed(() => product.value);

// Данные магазина/склада
const shopData = computed(() => product.value?.random_shop);

// Цены
const hasDiscount = computed(() => !!shopData.value?.discount?.price);

// 1. Актуальная цена (со скидкой или обычная)
const currentPrice = computed(() => {
  if (hasDiscount.value) {
    return shopData.value?.discount?.price;
  }
  return shopData.value?.price || null;
});

// 2. Старая цена (отображается только при наличии скидки)
const oldPrice = computed(() => {
  if (hasDiscount.value) {
    return shopData.value?.price || null;
  }
  return null;
});

const monthlyPrice = computed(() => shopData.value?.monthly_price);

// 3. Хелпер для форматирования чисел с пробелами (например: 1 500 000)
const formatPrice = (val: number | undefined | null) => {
  if (!val) return "";
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Первичная категория для хлебных крошек
const primaryCategory = computed(() => product.value?.categories?.[0] || null);
</script>

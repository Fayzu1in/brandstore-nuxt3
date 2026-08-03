<template>
  <div class="mx-auto max-w-[1481px] w-full px-[25px] pt-[30px] text-white">
    <div v-if="pending" class="animate-pulse space-y-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div class="flex gap-4 flex-col-reverse sm:flex-row">
          <div class="flex sm:flex-col gap-2 w-full sm:w-20">
            <div
              v-for="i in 4"
              :key="i"
              class="w-20 h-20 bg-[#1A1D21] rounded-xl"
            ></div>
          </div>
          <div
            class="flex-1 bg-[#1A1D21] rounded-2xl min-h-[350px] sm:min-h-[450px]"
          ></div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <div class="h-8 bg-[#1A1D21] rounded-lg w-32"></div>
            <div class="flex gap-3">
              <div class="w-10 h-10 bg-[#1A1D21] rounded-full"></div>
              <div class="w-10 h-10 bg-[#1A1D21] rounded-full"></div>
            </div>
          </div>

          <div class="h-6 bg-[#1A1D21] rounded-full w-40"></div>
          <div class="h-8 bg-[#1A1D21] rounded-lg w-3/4"></div>
          <div class="h-6 bg-[#1A1D21] rounded-lg w-1/2"></div>

          <!-- Блок цены -->
          <div
            class="h-28 bg-[#1A1D21] rounded-xl border border-gray-800"
          ></div>

          <!-- Кнопки -->
          <div class="flex gap-3 mt-2">
            <div class="h-12 bg-[#1A1D21] rounded-xl flex-1"></div>
            <div class="h-12 bg-[#1A1D21] rounded-xl flex-1"></div>
          </div>
          <div class="h-14 bg-[#1A1D21] rounded-xl w-full"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error || !product" class="py-20 text-center text-red-500">
      Товар не найден или произошла ошибка загрузки.
    </div>

    <template v-else>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div class="flex gap-4 flex-col-reverse sm:flex-row">
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

        <div class="flex flex-col">
          <div class="flex items-center justify-between mb-4">
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

            <div class="flex items-center gap-3 text-gray-400">
              <button
                @click="favoritesStore.toggleFavorite(product as any)"
                type="button"
                :class="[
                  'transition-colors p-2.5 rounded-full cursor-pointer flex items-center justify-center group',
                  favoritesStore.isFavorite(product?.id)
                    ? 'bg-[#E30909] text-white'
                    : 'bg-[#1A1D21] text-gray-300 hover:text-[#E30909]',
                ]"
                :title="
                  favoritesStore.isFavorite(product?.id)
                    ? 'Убрать из избранного'
                    : 'В избранное'
                "
              >
                <Icon
                  :name="
                    favoritesStore.isFavorite(product?.id)
                      ? 'mdi:heart'
                      : 'mdi:heart-outline'
                  "
                  class="text-xl transition-transform group-hover:scale-110"
                />
              </button>

              <button
                class="hover:text-blue-500 transition-colors p-2.5 bg-[#1A1D21] rounded-full cursor-pointer flex items-center justify-center group"
                title="Сравнить"
              >
                <Icon
                  name="mdi:compare"
                  class="text-xl transition-transform group-hover:scale-110"
                />
              </button>

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
            <span
              v-if="(shopData?.bs_quant ?? 0) >= 1"
              class="inline-flex items-center gap-1.5 text-[13px] text-[#02B513] bg-[#02B513]/10 px-3 py-1 rounded-full font-medium"
            >
              <span class="w-2 h-2 bg-[#02B513] rounded-full"></span>
              В магазине ({{ shopData.bs_quant }} шт.)
            </span>

            <span
              v-else-if="(shopData?.quantity ?? 0) > 0"
              class="inline-flex items-center gap-1.5 text-[13px] text-[#E5A93C] bg-[#E5A93C]/10 px-3 py-1 rounded-full font-medium"
            >
              <span class="w-2 h-2 bg-[#E5A93C] rounded-full"></span>
              На складе (сегодня/завтра)
            </span>

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

          <!-- Блок цены -->
          <div
            class="flex flex-col sm:flex-row sm:items-end justify-between bg-[#1A1D21] p-4 sm:p-5 rounded-xl mb-6 border border-gray-800 gap-4"
          >
            <div class="flex flex-col gap-1">
              <div
                v-if="oldPrice"
                class="text-base font-medium text-gray-400 line-through decoration-[#E30909]/80 decoration-2"
              >
                {{ formatPrice(oldPrice) }} сум
              </div>

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

                <span
                  v-if="hasDiscount"
                  class="inline-flex items-center justify-center bg-orange-500/10 text-orange-500 p-1 rounded-md text-xl"
                  title="Скидка"
                >
                  <Icon name="mdi:fire" class="animate-pulse" />
                </span>
              </div>

              <div
                class="flex items-center gap-3 text-[12px] text-gray-400 mt-1 flex-wrap"
              >
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

      <!-- Описание -->
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

      <div class="my-10 mb-[-10px] relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-white/10"></div>
        </div>
        <div class="relative flex justify-center">
          <span
            class="bg-[#13181e] px-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            Похожие товары
          </span>
        </div>
      </div>

      <ProductSection
        v-if="similarProducts.length || similarLoading"
        title=""
        :items="similarProducts"
        :loading="similarLoading"
        carousel
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { api } from "~/utils/api";
import { useFavoritesStore } from "~/stores/useFavoritesStore";

const route = useRoute();

const {
  data: product,
  pending,
  error,
} = useLazyAsyncData(
  `product-${route.params.slug}`,
  () => api.getProductBySlug(route.params.slug as string),
  {
    watch: [() => route.params.slug],
  },
);

const productId = computed(() => product.value?.id);
const favoritesStore = useFavoritesStore();

// Похожие товары подгружаются аналогично через lazy
const { data: similarRes, pending: similarLoading } = useLazyAsyncData(
  `similar-products-${productId.value}`,
  async () => {
    if (!productId.value) return null;
    return await api.getSimilarProducts(productId.value, 10);
  },
  {
    watch: [productId],
    immediate: !!productId.value,
  },
);

const similarProducts = computed(() => {
  return (
    similarRes.value?.data?.product_request ||
    similarRes.value?.data ||
    similarRes.value ||
    []
  );
});

const activeImage = ref<string>("");
const images = computed(() => product.value?.images || []);

watchEffect(() => {
  if (images.value.length > 0) {
    activeImage.value = images.value[0].url;
  }
});

const shopData = computed(() => product.value?.random_shop);
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

const monthlyPrice = computed(() => shopData.value?.monthly_price);

const formatPrice = (val: number | undefined | null) => {
  if (!val) return "";
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
</script>

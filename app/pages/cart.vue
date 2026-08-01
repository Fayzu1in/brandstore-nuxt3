<template>
  <div class="max-w-[1440px] mx-auto px-4 py-6 min-h-[70vh] text-white">
    <!-- Заголовок -->
    <h1 class="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
      <span>Ваша корзина</span>
      <span
        v-if="cartStore.totalCount > 0"
        class="text-sm font-medium px-3 py-1 rounded-full bg-white/10 text-gray-300"
      >
        {{ cartStore.totalCount }} товара
      </span>
    </h1>

    <!-- Основной контент: Сетка из 2-х колонок -->
    <div
      v-if="cartStore.items.length > 0"
      class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      <!-- Левая колонка: Список товаров и блок рекомендаций (8 колонок) -->
      <div class="lg:col-span-8 space-y-4">
        <!-- Шапка списка (Очистить / Выбрать) -->
        <div
          class="flex items-center justify-between pb-2 border-b border-white/10"
        >
          <span class="text-sm text-gray-400">Товары в заказе</span>
          <button
            @click="cartStore.clearCart()"
            type="button"
            class="text-sm text-gray-400 hover:text-[#E30909] transition-colors"
          >
            Очистить корзину
          </button>
        </div>

        <!-- Список товаров -->
        <div class="space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="bg-[#12161D] rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-white/20"
          >
            <!-- Картинка + Инфо -->
            <div class="flex items-center gap-4 w-full sm:w-auto">
              <NuxtLink
                :to="`/productPage/${item.slug}`"
                class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-white/5 p-2 shrink-0 flex items-center justify-center overflow-hidden"
              >
                <img
                  :src="
                    item.image ||
                    item.photo ||
                    item.images?.[0] ||
                    '/placeholder.png'
                  "
                  :alt="item.name"
                  class="max-w-full max-h-full object-contain"
                />
              </NuxtLink>

              <div class="flex-1">
                <NuxtLink
                  :to="`/productPage/${item.slug}`"
                  class="font-medium text-sm sm:text-base hover:text-[#E30909] transition-colors line-clamp-2 mb-1"
                >
                  {{ item.name }}
                </NuxtLink>
                <p v-if="item.seller" class="text-xs text-gray-400">
                  Продавец: {{ item.seller }}
                </p>
              </div>
            </div>

            <!-- Управление: Кол-во + Цена + Действия -->
            <div
              class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0"
            >
              <!-- Кнопки +/- -->
              <div
                class="flex items-center bg-[#1A1D21] border border-white/10 rounded-xl px-2 py-1"
              >
                <button
                  @click="cartStore.updateQuantity(item.id, -1)"
                  type="button"
                  class="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Icon name="lucide:minus" class="w-4 h-4" />
                </button>

                <span class="w-8 text-center font-semibold text-sm">
                  {{ item.quantity }}
                </span>

                <button
                  @click="cartStore.updateQuantity(item.id, 1)"
                  type="button"
                  class="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Icon name="lucide:plus" class="w-4 h-4" />
                </button>
              </div>

              <!-- Стоимость -->
              <div class="text-right min-w-[110px]">
                <div class="font-bold text-base sm:text-lg whitespace-nowrap">
                  {{
                    formatPrice(
                      (item.discount?.price || item.price) * item.quantity,
                    )
                  }}
                  сум
                </div>
                <div
                  v-if="item.discount?.price"
                  class="text-xs text-gray-400 line-through whitespace-nowrap"
                >
                  {{ formatPrice((item.price ?? 0) * item.quantity) }} сум
                </div>
              </div>

              <!-- Кнопки в Избранное / Удалить -->
              <div class="flex items-center gap-2">
                <button
                  @click="favoritesStore.toggleFavorite(item)"
                  type="button"
                  class="p-2 text-gray-400 hover:text-[#E30909] transition-colors"
                  :title="
                    favoritesStore.isFavorite(item.id)
                      ? 'В избранном'
                      : 'В избранное'
                  "
                >
                  <Icon
                    :name="
                      favoritesStore.isFavorite(item.id)
                        ? 'mdi:heart'
                        : 'mdi:heart-outline'
                    "
                    class="w-5 h-5"
                    :class="
                      favoritesStore.isFavorite(item.id) ? 'text-[#E30909]' : ''
                    "
                  />
                </button>

                <button
                  @click="cartStore.removeFromCart(item.id)"
                  type="button"
                  class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Удалить"
                >
                  <Icon name="lucide:trash-2" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 💡 Блок: Может пригодиться / Товары для вас -->
        <div class="mt-8 bg-[#12161D] border border-white/10 rounded-2xl p-5">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <Icon name="lucide:sparkles" class="w-5 h-5 text-[#E30909]" />
              <h3 class="font-bold text-base">Может пригодиться</h3>
            </div>
            <span class="text-xs text-gray-400">Товары для вас</span>
          </div>

          <!-- Сетка рекомендованных сопутствующих товаров -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              v-for="recommend in recommendedProducts"
              :key="recommend.id"
              class="bg-[#1A1D21] p-3 rounded-xl border border-white/5 flex flex-col justify-between"
            >
              <div class="h-20 flex items-center justify-center mb-2">
                <img
                  :src="recommend.image"
                  :alt="recommend.name"
                  class="max-h-full object-contain"
                />
              </div>
              <p class="text-xs font-medium line-clamp-2 mb-2 text-gray-300">
                {{ recommend.name }}
              </p>
              <div class="flex items-center justify-between mt-auto">
                <span class="text-xs font-bold text-white">
                  {{ formatPrice(recommend.price) }} сум
                </span>
                <button
                  @click="cartStore.addToCart(recommend)"
                  type="button"
                  class="p-1.5 bg-[#E30909] text-white rounded-lg hover:bg-[#b80707] transition-colors"
                >
                  <Icon name="lucide:plus" class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Правая колонка: Итоговый чек (4 колонки) -->
      <div class="lg:col-span-4 sticky top-24">
        <div
          class="bg-[#12161D] border border-white/10 rounded-2xl p-6 space-y-4"
        >
          <h2 class="text-xl font-bold pb-2 border-b border-white/10">
            Ваш заказ
          </h2>

          <div class="space-y-2.5 text-sm">
            <div class="flex justify-between text-gray-300">
              <span>Товары ({{ cartStore.totalCount }}):</span>
              <span>{{ formatPrice(cartStore.totalPrice) }} сум</span>
            </div>

            <div class="flex justify-between text-gray-300">
              <span>Доставка:</span>
              <span class="text-green-400 font-medium">Бесплатно</span>
            </div>
          </div>

          <div
            class="pt-3 border-t border-white/10 flex justify-between items-end"
          >
            <div>
              <span class="text-xs text-gray-400 block">Итого к оплате:</span>
              <span class="text-2xl font-bold text-white">
                {{ formatPrice(cartStore.totalPrice) }} сум
              </span>
            </div>
          </div>

          <button
            type="button"
            class="w-full bg-[#E30909] hover:bg-[#b80707] active:scale-[0.98] text-white py-3.5 rounded-xl font-bold text-base transition-all cursor-pointer shadow-lg shadow-[#E30909]/20"
          >
            Перейти к оформлению
          </button>
        </div>
      </div>
    </div>

    <!-- Пустая корзина -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-16 text-center bg-[#12161D] rounded-3xl border border-white/10 p-6"
    >
      <div
        class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-400"
      >
        <Icon name="mdi:cart-outline" class="w-8 h-8" />
      </div>
      <h2 class="text-xl font-semibold mb-2">Ваша корзина пуста</h2>
      <p class="text-gray-400 text-sm max-w-md mb-6">
        Самое время добавить в неё что-нибудь интересное!
      </p>
      <NuxtLink
        to="/"
        class="bg-[#E30909] hover:bg-[#b80707] text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
      >
        Перейти к покупкам
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "~/stores/useCartStore";
import { useFavoritesStore } from "~/stores/useFavoritesStore";

const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

// Форматирование цен с пробелами
const formatPrice = (val?: number | string | null) => {
  if (!val) return "0";
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Заглушка для блока "Может пригодиться" (пока нет бэкенда)
const recommendedProducts = ref([
  {
    id: 991,
    name: "Кабель Type-C Fast Charge 1m",
    price: 45000,
    slug: "kabel-type-c",
    image: "/placeholder.png",
  },
  {
    id: 992,
    name: "Защитное стекло iPhone 14 Pro",
    price: 35000,
    slug: "glass-iphone-14-pro",
    image: "/placeholder.png",
  },
  {
    id: 993,
    name: "Коврик для мыши Gaming XL",
    price: 89000,
    slug: "kovrik-gaming-xl",
    image: "/placeholder.png",
  },
]);
</script>

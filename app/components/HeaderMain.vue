<template>
  <section
    class="w-full bg-[#000000] text-white py-3 shadow-lg shadow-black/40 relative z-50"
  >
    <div
      class="mx-auto flex flex-col md:flex-row max-w-[1481px] w-full items-center justify-between px-4 sm:px-[25px] gap-3 md:gap-6"
    >
      <div class="flex items-center justify-between w-full md:w-auto">
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="block">
            <span
              class="text-xl sm:text-2xl font-bold tracking-wider text-white select-none"
            >
              <span class="text-[#FFFF] bg-[#E30909] p-[3px]">BRAND</span>
              <span class="text-[#FFFF] p-[3px]">STORE</span>
            </span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4 md:hidden">
          <NuxtLink
            to="/favourites"
            class="flex flex-col items-center text-[#a0a5ab] hover:text-white transition-colors group"
          >
            <Icon
              name="mdi:cards-heart"
              class="text-2xl transition-transform group-hover:scale-110"
            />
          </NuxtLink>

          <NuxtLink
            to="/cart"
            class="flex flex-col items-center text-[#a0a5ab] hover:text-white transition-colors group"
          >
            <Icon
              name="mdi:cart"
              class="text-2xl transition-transform group-hover:scale-110"
            />
          </NuxtLink>
        </div>
      </div>

      <div
        ref="searchContainerRef"
        class="w-full md:flex-grow md:max-w-[680px] relative"
      >
        <div
          class="relative flex items-center w-full h-[40px] sm:h-[44px] bg-white rounded-full p-1 pl-2 sm:pl-2 pr-4 overflow-hidden z-30"
        >
          <button
            @click="$emit('toggle-menu')"
            type="button"
            class="flex items-center gap-2 bg-[#E30909] text-white px-3 sm:px-5 py-2 rounded-full font-medium text-[13px] sm:text-[15px] hover:bg-[#b80707] transition-all duration-200 cursor-pointer h-[32px] sm:h-[36px] flex-shrink-0"
          >
            <Icon
              :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'"
              class="w-5 h-5"
            />
            <span>Категории</span>
          </button>

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Искать товары"
            class="w-full bg-transparent pl-2 sm:pl-4 text-black placeholder-gray-400 focus:outline-none text-[14px] sm:text-[15px]"
            @input="handleInput"
            @focus="isOpen = true"
            @keydown.enter="goToSearchPage"
          />

          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              v-if="searchQuery"
              type="button"
              class="text-gray-400 hover:text-black transition-colors mt-[8px]"
              @click="clearSearch"
            >
              <Icon name="mdi:close" class="text-lg" />
            </button>

            <button
              type="button"
              class="text-[#E30909] hover:scale-105 transition-transform cursor-pointer"
              @click="goToSearchPage"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <Transition name="fade">
          <div
            v-if="isOpen && searchQuery.trim().length >= 2"
            class="absolute top-full left-0 w-full bg-[#1c2229] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-20 py-2 mt-2 backdrop-blur-md"
          >
            <div v-if="isLoading" class="p-2 space-y-2">
              <div
                v-for="n in 4"
                :key="'skeleton-' + n"
                class="flex items-center gap-3 p-2 rounded-xl animate-pulse"
              >
                <div class="w-10 h-10 bg-white/10 rounded-lg shrink-0"></div>
                <div class="flex-grow space-y-1.5">
                  <div class="h-3 bg-white/10 rounded w-1/4"></div>
                  <div class="h-4 bg-white/10 rounded w-3/4"></div>
                </div>
                <div class="h-4 bg-white/10 rounded w-16 shrink-0"></div>
              </div>
            </div>

            <div
              v-else-if="results.length"
              class="max-h-[360px] overflow-y-auto custom-scrollbar"
            >
              <NuxtLink
                v-for="product in results"
                :key="product.id"
                :to="`/productPage/${product.slug}`"
                class="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group"
                @click="closeDropdown"
              >
                <!-- Картинка -->
                <img
                  :src="product.image || product.photo || '/placeholder.png'"
                  :alt="product.name"
                  class="w-10 h-10 object-contain rounded-lg bg-white/5 p-1 shrink-0"
                />

                <!-- Название, Категория и Наличие -->
                <div class="flex-grow min-w-0 flex flex-col justify-center">
                  <div
                    class="text-[13px] text-white font-medium truncate group-hover:text-[#E30909] transition-colors leading-tight"
                  >
                    {{ product.name }}
                  </div>

                  <!-- БЛОК НАЛИЧИЯ (Компактный) -->
                  <div class="flex items-center gap-1.5 mt-1 text-[11px]">
                    <!-- 1. В магазине -->
                    <template v-if="(product.random_shop?.bs_quant ?? 0) >= 1">
                      <span
                        class="w-1.5 h-1.5 bg-[#02B513] rounded-full shrink-0"
                      ></span>
                      <span class="text-[#a0a5ab] truncate"> На витрине </span>
                    </template>

                    <template
                      v-else-if="(product.random_shop?.quantity ?? 0) > 0"
                    >
                      <span
                        class="w-1.5 h-1.5 bg-[#E5A93C] rounded-full shrink-0"
                      ></span>
                      <span class="text-[#a0a5ab] truncate"
                        >На складе (1-2 дня)</span
                      >
                    </template>

                    <!-- 3. Под заказ -->
                    <template v-else>
                      <span
                        class="w-1.5 h-1.5 bg-[#a0a5ab] rounded-full shrink-0"
                      ></span>
                      <span class="text-[#a0a5ab] truncate">Под заказ</span>
                    </template>
                  </div>
                </div>

                <div
                  class="flex flex-col items-end justify-center shrink-0 ml-2 text-right"
                >
                  <span
                    v-if="getOldPrice(product.random_shop)"
                    class="text-[11px] text-gray-400 line-through decoration-[#E30909] leading-none mb-0.5"
                  >
                    {{ formatPrice(getOldPrice(product.random_shop)) }} сум
                  </span>

                  <span
                    v-if="getCurrentPrice(product.random_shop)"
                    class="text-[13px] font-bold text-white leading-none"
                  >
                    {{ formatPrice(getCurrentPrice(product.random_shop)) }} сум
                  </span>

                  <span
                    v-else
                    class="text-[12px] font-medium text-gray-400 leading-none"
                  >
                    По запросу
                  </span>
                </div>
              </NuxtLink>

              <button
                type="button"
                class="w-full py-2.5 px-4 text-center text-xs font-semibold text-[#E30909] bg-white/5 hover:bg-white/10 transition-colors border-t border-white/5 cursor-pointer mt-1"
                @click="goToSearchPage"
              >
                Посмотреть все результаты ({{ totalCount }}) →
              </button>
            </div>

            <div
              v-else-if="!isLoading"
              class="p-6 text-center text-sm text-gray-400"
            >
              Ничего не найдено по запросу «<span class="text-white">{{
                searchQuery
              }}</span
              >»
            </div>
          </div>
        </Transition>
      </div>

      <div class="hidden md:flex items-center gap-6 flex-shrink-0">
        <NuxtLink
          to="/favourites"
          :class="[
            'flex flex-col items-center gap-1 transition-colors cursor-pointer group relative',
            route.path === '/favourites'
              ? 'text-white'
              : 'text-[#a0a5ab] hover:text-white',
          ]"
        >
          <!-- Контейнер для иконки и бейджика -->
          <div class="relative">
            <Icon
              name="mdi:cards-heart"
              :class="[
                'text-xl transition-transform group-hover:scale-110',
                route.path === '/favourites' ? 'text-[#E30909]' : '',
              ]"
            />

            <!-- Бейджик с количеством товаров -->
            <span
              v-if="favoritesStore.count > 0"
              class="absolute -top-1.5 -right-2.5 bg-[#E30909] text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border-2 border-[#12161D]"
            >
              {{ favoritesStore.count }}
            </span>
          </div>

          <span class="text-[12px]">Избранное</span>
        </NuxtLink>

        <NuxtLink
          to="/cart"
          :class="[
            'flex flex-col items-center gap-1 transition-colors cursor-pointer group relative',
            route.path === '/cart'
              ? 'text-white'
              : 'text-[#a0a5ab] hover:text-white',
          ]"
        >
          <div class="relative">
            <Icon
              name="mdi:cart-outline"
              :class="[
                'text-xl transition-transform group-hover:scale-110',
                route.path === '/cart' ? 'text-[#E30909]' : '',
              ]"
            />

            <!-- Счетчик товаров в корзине -->
            <span
              v-if="cartStore.totalCount > 0"
              class="absolute -top-1.5 -right-2.5 bg-[#E30909] text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border-2 border-[#12161D]"
            >
              {{ cartStore.totalCount }}
            </span>
          </div>

          <span class="text-[12px]">Корзина</span>
        </NuxtLink>
      </div>
    </div>
    <!-- Десктопное меню -->
    <div class="hidden lg:block">
      <CategoryMegaMenu :is-open="isMenuOpen" @close="$emit('toggle-menu')" />
    </div>

    <!-- Мобильная шторка -->

    <!-- Темный оверлей под меню -->
    <!-- Монтируем только то меню, которое соответствует экрану -->
    <CategoryMegaMenu
      v-if="isDesktop"
      :is-open="isMenuOpen"
      @close="$emit('toggle-menu')"
    />

    <CategoryMobileDrawer
      v-else
      :is-open="isMenuOpen"
      @close="$emit('toggle-menu')"
    />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { api } from "~/utils/api";
import { useMediaQuery } from "@vueuse/core";
import { useFavoritesStore } from "~/stores/useFavoritesStore";
import { useCartStore } from "~/stores/useCartStore";

// Принимаем пропсы
defineProps({
  isMenuOpen: {
    type: Boolean,
    default: false,
  },
});

// Эмитим события наверх
defineEmits(["toggle-menu"]);

// Определяем десктоп ли это (экран >= 1024px)
const isDesktop = useMediaQuery("(min-width: 1024px)");
const cartStore = useCartStore();
const router = useRouter();
const route = useRoute();
const favoritesStore = useFavoritesStore();
const searchQuery = ref("");
const results = ref([]);
const totalCount = ref(0);
const isLoading = ref(false);
const isOpen = ref(false);
const searchContainerRef = ref(null);

let debounceTimer = null;

// Обработка ввода с дебаунсом 300мс
const handleInput = () => {
  isOpen.value = true;
  clearTimeout(debounceTimer);

  if (searchQuery.value.trim().length < 2) {
    results.value = [];
    return;
  }

  isLoading.value = true;
  debounceTimer = setTimeout(async () => {
    try {
      const res = await api.searchProducts(searchQuery.value.trim());

      const allProducts =
        res?.products || res?.data?.products || res?.data || [];

      totalCount.value =
        res?.meta?.total || res?.data?.meta?.total || allProducts.length;

      results.value = Array.isArray(allProducts) ? allProducts.slice(0, 6) : [];
    } catch (e) {
      console.error("Ошибка при поиске:", e);
      results.value = [];
      totalCount.value = 0;
    } finally {
      isLoading.value = false;
    }
  }, 300);
};

// Очистка строки
const clearSearch = () => {
  searchQuery.value = "";
  results.value = [];
  isOpen.value = false;
};

// Переход на страницу поиска по Enter / Клику
const goToSearchPage = () => {
  const query = searchQuery.value.trim();
  if (!query) return;

  isOpen.value = false;
  router.push({ path: "/search", query: { q: query } });
};

const closeDropdown = () => {
  isOpen.value = false;
};

// Закрытие при клике мимо поиска
const handleClickOutside = (event) => {
  if (
    searchContainerRef.value &&
    !searchContainerRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
};

// Проверка наличия скидки в random_shop
const hasDiscount = (shop) => {
  return Boolean(shop?.discount && shop?.discount?.price);
};

// Получение актуальной цены
const getCurrentPrice = (shop) => {
  if (hasDiscount(shop)) {
    return shop?.discount?.price;
  }
  return shop?.price || null;
};

// Получение старой цены
const getOldPrice = (shop) => {
  if (hasDiscount(shop)) {
    return shop?.price || null;
  }
  return null;
};

// Форматирование числа с пробелами
const formatPrice = (val) => {
  if (!val) return "";
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Синхронизация поискового запроса с URL
watch(
  () => route.query.q,
  (newQ) => {
    if (newQ) {
      searchQuery.value = newQ;
    }
  },
  { immediate: true },
);

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  clearTimeout(debounceTimer);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

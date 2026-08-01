<template>
  <Teleport to="body">
    <!-- Оверлей -->
    <Transition
      enter-active-class="transition opacity-0 duration-300"
      enter-to-class="opacity-100"
      leave-active-class="transition opacity-100 duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        @click="closeMenu"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
      ></div>
    </Transition>

    <!-- Выдвижная шторка -->
    <Transition
      enter-active-class="transition transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed top-0 left-0 w-[85%] max-w-[360px] h-full bg-[#12161D] text-white z-[101] flex flex-col shadow-2xl border-r border-white/10"
      >
        <!-- Шапка шторки -->
        <div
          class="flex items-center justify-between p-4 border-b border-white/10"
        >
          <span class="text-lg font-bold">Категории</span>
          <button
            @click="closeMenu"
            type="button"
            class="p-2 text-gray-400 hover:text-white rounded-full bg-white/5"
          >
            <Icon name="lucide:x" class="w-6 h-6" />
          </button>
        </div>

        <!-- Дерево категорий (Аккордеон) -->
        <div class="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          <div
            v-for="cat in categories"
            :key="cat.id"
            class="border-b border-white/5 pb-2"
          >
            <!-- Главная категория (Уровень 1) -->
            <div class="flex items-center justify-between py-2.5">
              <NuxtLink
                :to="`/catalog/${cat.slug}`"
                @click="closeMenu"
                class="flex items-center gap-3 font-semibold text-[15px] text-white hover:text-[#38bdf8] transition-colors min-w-0"
              >
                <img
                  v-if="cat.image"
                  :src="cat.image"
                  class="w-5 h-5 object-contain flex-shrink-0"
                  alt=""
                />
                <span class="truncate">{{ cat.name }}</span>
              </NuxtLink>

              <!-- Кнопка раскрытия списков -->
              <button
                v-if="cat.childs?.length"
                @click="toggleCategory(cat.id)"
                type="button"
                class="p-2 text-gray-400 hover:text-white"
              >
                <Icon
                  name="lucide:chevron-down"
                  :class="[
                    'w-5 h-5 transition-transform duration-200',
                    expandedCats.includes(cat.id)
                      ? 'rotate-180 text-[#38bdf8]'
                      : '',
                  ]"
                />
              </button>
            </div>

            <!-- Подкатегории (Уровень 2) -->
            <div
              v-if="cat.childs?.length && expandedCats.includes(cat.id)"
              class="pl-4 pr-2 py-2 space-y-3 bg-white/[0.02] rounded-xl my-1"
            >
              <NuxtLink
                :to="`/catalog/${cat.slug}`"
                @click="closeMenu"
                class="block text-xs font-semibold text-[#38bdf8] hover:underline"
              >
                Показать все в «{{ cat.name }}»
              </NuxtLink>

              <div
                v-for="subCat in cat.childs"
                :key="subCat.id"
                class="space-y-1.5"
              >
                <div class="flex items-center justify-between py-1">
                  <NuxtLink
                    :to="`/catalog/${cat.slug}/${subCat.slug}`"
                    @click="closeMenu"
                    class="text-sm font-medium text-gray-200 hover:text-white"
                  >
                    {{ subCat.name }}
                  </NuxtLink>

                  <button
                    v-if="subCat.childs?.length"
                    @click="toggleCategory(subCat.id)"
                    type="button"
                    class="p-1 text-gray-400"
                  >
                    <Icon
                      name="lucide:chevron-down"
                      :class="[
                        'w-4 h-4 transition-transform duration-200',
                        expandedCats.includes(subCat.id)
                          ? 'rotate-180 text-[#38bdf8]'
                          : '',
                      ]"
                    />
                  </button>
                </div>

                <!-- Глубокие подкатегории (Уровень 3) -->
                <div
                  v-if="
                    subCat.childs?.length && expandedCats.includes(subCat.id)
                  "
                  class="pl-3 space-y-2 border-l border-white/10 my-1"
                >
                  <NuxtLink
                    v-for="deepSub in subCat.childs"
                    :key="deepSub.id"
                    :to="`/catalog/${cat.slug}/${subCat.slug}`"
                    @click="closeMenu"
                    class="block text-xs text-gray-400 hover:text-white py-0.5"
                  >
                    {{ deepSub.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { useCategoryStore } from "~/stores/useCategoryStore";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);

// Список ID раскрытых аккордеонов
const expandedCats = ref<number[]>([]);

const toggleCategory = (id: number) => {
  if (expandedCats.value.includes(id)) {
    expandedCats.value = expandedCats.value.filter((catId) => catId !== id);
  } else {
    expandedCats.value.push(id);
  }
};

// Блокировка скролла страницы при открытии
watch(
  () => props.isOpen,
  (val) => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = val ? "hidden" : "";
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});

const closeMenu = () => {
  emit("close");
};
</script>

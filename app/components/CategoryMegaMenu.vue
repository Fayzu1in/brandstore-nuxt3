<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="isOpen"
      class="absolute top-full left-0 w-full h-[calc(100vh-64px)] bg-[#12161D] border-t border-white/10 shadow-2xl z-50 text-white"
    >
      <div class="max-w-[1440px] mx-auto flex h-full p-4 gap-6">
        <!-- ЛЕВАЯ КОЛОНКА -->
        <div
          class="w-[300px] h-full overflow-y-auto custom-scrollbar pr-2 space-y-1 flex-shrink-0"
        >
          <NuxtLink
            v-for="cat in categories"
            :key="cat.id"
            :to="`/catalog/${cat.slug}`"
            @mouseenter="activeCategoryId = cat.id"
            @click="closeMenu"
            :class="[
              'flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer',
              activeCategoryId === cat.id
                ? 'bg-[#1e2634] text-[#38bdf8] font-semibold'
                : 'text-gray-300 hover:bg-white/5 hover:text-white',
            ]"
          >
            <div class="flex items-center gap-3.5 min-w-0">
              <img
                v-if="cat.image"
                :src="cat.image"
                class="w-5 h-5 object-contain flex-shrink-0 transition-transform group-hover:scale-110"
                alt=""
              />
              <Icon
                v-else
                name="lucide:shapes"
                class="w-5 h-5 text-gray-400 group-hover:text-white flex-shrink-0"
              />
              <span class="text-[14px] truncate">{{ cat.name }}</span>
            </div>

            <Icon
              name="lucide:chevron-right"
              :class="[
                'w-4 h-4 transition-transform duration-200 flex-shrink-0',
                activeCategoryId === cat.id
                  ? 'text-[#38bdf8] translate-x-0.5'
                  : 'text-gray-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5',
              ]"
            />
          </NuxtLink>
        </div>

        <!-- Разделительная линия -->
        <div class="w-[1px] h-full bg-white/10"></div>

        <!-- ПРАВАЯ КОЛОНКА (ПОДКАТЕГОРИИ) -->
        <div
          class="flex-1 h-full pl-2 pr-4 overflow-y-auto custom-scrollbar py-2"
        >
          <div v-if="activeCategory" class="h-full flex flex-col">
            <!-- Заголовок активной категории -->
            <div class="border-b border-white/10 pb-4 mb-6">
              <NuxtLink
                :to="`/catalog/${activeCategory.slug}`"
                @click="closeMenu"
                class="text-xl font-bold hover:text-[#38bdf8] transition-colors inline-flex items-center gap-2 group"
              >
                <span>{{ activeCategory.name }}</span>
                <Icon
                  name="lucide:arrow-right"
                  class="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                />
              </NuxtLink>
            </div>

            <!-- ПЛОТНАЯ КОЛОНОЧНАЯ ВЕРСТКА: подкатегории поджимаются по вертикали -->
            <!-- ПРАВИЛЬНЫЙ ВАРИАНТ: Flexbox с авто-высотой элементов -->
            <!-- Разделяем массив на 3 независимые вертикальные колонки -->
            <div
              v-if="activeCategory.childs?.length"
              class="grid grid-cols-3 gap-8 items-start"
            >
              <!-- Генерируем 3 колонки (colIndex: 0, 1, 2) -->
              <div
                v-for="colIndex in [0, 1, 2]"
                :key="colIndex"
                class="space-y-6"
              >
                <!-- Отбираем элементы только для текущей колонки -->
                <div
                  v-for="subCat in activeCategory.childs.filter(
                    (_, idx) => idx % 3 === colIndex,
                  )"
                  :key="subCat.id"
                  class="space-y-2"
                >
                  <!-- Заголовок подкатегории -->
                  <NuxtLink
                    :to="`/catalog/${activeCategory.slug}/${subCat.slug}`"
                    @click="closeMenu"
                    class="font-bold text-[15px] text-white hover:text-[#38bdf8] transition-colors block"
                  >
                    {{ subCat.name }}
                  </NuxtLink>

                  <!-- Вложенные подкатегории (если есть) -->
                  <div v-if="subCat.childs?.length" class="space-y-1.5 pl-1">
                    <NuxtLink
                      v-for="deepSub in subCat.childs"
                      :key="deepSub.id"
                      :to="`/catalog/${activeCategory.slug}/${subCat.slug}`"
                      @click="closeMenu"
                      class="block text-[13px] text-gray-400 hover:text-white transition-colors"
                    >
                      {{ deepSub.name }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- Если у категории нет подкатегорий -->
            <div v-else class="text-gray-400 text-sm py-12 text-center">
              В этой категории пока нет подкатегорий
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
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
const activeCategoryId = ref<number | null>(null);

// 🔒 БЛОКИРОВКА СКРОЛЛА СТРАНИЦЫ ПРИ ОТКРЫТОМ МЕНЮ
watch(
  () => props.isOpen,
  (val) => {
    if (typeof document !== "undefined") {
      if (val) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    if (val && categories.value.length > 0) {
      activeCategoryId.value = categories.value[0]?.id ?? null;
    }
  },
  { immediate: true },
);

// Очищаем блокировку скролла при размонтировании
onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});

const activeCategory = computed(() => {
  return categories.value.find((c) => c.id === activeCategoryId.value);
});

const closeMenu = () => {
  emit("close");
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
</style>

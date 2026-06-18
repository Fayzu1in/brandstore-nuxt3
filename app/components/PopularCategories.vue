<template>
  <section class="w-full text-white py-8">
    <div class="mx-auto max-w-[1481px] w-full px-[25px]">
      <h2
        class="text-[24px] font-bold tracking-tight text-white md:text-[28px] mb-6"
      >
        Популярные категории
      </h2>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <NuxtLink
          v-for="(category, index) in categories"
          :key="index"
          :to="category.link || '#'"
          class="relative flex flex-col items-center justify-between bg-[#1c2229] rounded-2xl p-5 min-h-[180px] group transition-all duration-300 hover:bg-[#232a33] hover:scale-[1.02] cursor-pointer"
        >
          <div
            class="w-full flex-grow flex items-center justify-center p-2 mb-3"
          >
            <img
              :src="category.image"
              :alt="category.name"
              class="max-w-full max-h-[120px] object-contain transition-transform duration-300 group-hover:-translate-y-1"
            />
          </div>

          <span
            class="text-[14px] font-medium text-center text-gray-200 group-hover:text-white transition-colors leading-tight"
          >
            {{ category.name }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// Принимаем данные с бэка через пропсы, чтобы компонент был чистым
defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

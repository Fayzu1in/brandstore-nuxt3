<template>
  <section class="w-full text-white py-6 md:py-8">
    <div class="mx-auto max-w-[1481px] w-full px-4 sm:px-[25px]">
      <!-- Заголовок с аккуратным отступом -->
      <h2
        class="text-[18px] sm:text-[22px] md:text-[28px] font-bold tracking-tight text-white leading-tight mb-4 md:mb-6"
      >
        Популярные категории
      </h2>

      <!-- Сетка кнопок -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4"
      >
        <NuxtLink
          v-for="(category, index) in categories"
          :key="index"
          :to="category.link || '#'"
          class="button-30 !h-auto min-h-[48px] sm:min-h-[54px] !px-2.5 !py-2 flex items-center justify-center text-center !whitespace-normal"
          role="button"
        >
          <span
            class="text-[11px] sm:text-[13px] md:text-[15px] font-medium leading-tight line-clamp-2"
          >
            {{ category.name }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
<style lang="scss">
.button-30 {
  align-items: center;
  appearance: none;
  background-color: #fcfcfd;
  border-radius: 4px;
  border-width: 0;
  box-shadow:
    rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #13181e;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition:
    box-shadow 0.15s,
    transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
}

.button-30:focus {
  box-shadow:
    #d6d6e7 0 0 0 1.5px inset,
    rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow:
    rgba(45, 35, 66, 0.4) 0 4px 8px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #d6d6e7 0 3px 7px inset;
  transform: translateY(2px);
}
</style>

<template>
  <div class="w-full py-12 flex justify-center items-center">
    <div
      class="max-w-[480px] w-full bg-[#1b233d]/40 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl backdrop-blur-sm"
    >
      <!-- Иконка ошибки -->
      <div
        class="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[#E30909] mb-4"
      >
        <Icon name="mdi:alert-circle-outline" class="text-3xl" />
      </div>

      <!-- Заголовок -->
      <h3 class="text-lg font-bold text-white mb-2">
        {{ title }}
      </h3>

      <!-- Описание ошибки или кастомный текст -->
      <p class="text-sm text-[#a0a5ab] mb-6 leading-relaxed">
        {{ description }}
      </p>

      <!-- Кнопка обновления/повтора -->
      <button
        type="button"
        class="inline-flex items-center gap-2 bg-[#E30909] hover:bg-[#c40808] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
        @click="onRetry"
      >
        <Icon name="mdi:refresh" class="text-lg" />
        <span>Попробовать снова</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "Упс! Не удалось загрузить товары",
  },
  description: {
    type: String,
    default:
      "Произошла ошибка при получении данных с сервера. Попробуйте обновить страницу.",
  },
});

const emit = defineEmits(["retry"]);

const onRetry = () => {
  emit("retry");
};
</script>

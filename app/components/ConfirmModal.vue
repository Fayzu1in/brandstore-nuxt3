<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click.self="cancel"
    >
      <div
        class="bg-[#12161D] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200"
      >
        <div
          class="w-12 h-12 bg-[#E30909]/10 rounded-full flex items-center justify-center mb-4 text-[#E30909]"
        >
          <Icon name="lucide:alert-triangle" class="w-6 h-6" />
        </div>

        <h3 class="text-xl font-bold text-white mb-2">
          {{ title }}
        </h3>
        <p class="text-sm text-gray-400 mb-6">
          {{ message }}
        </p>

        <!-- Кнопки действий -->
        <div class="flex items-center justify-end gap-3">
          <button
            @click="cancel"
            type="button"
            class="px-4 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 font-medium text-sm transition-colors cursor-pointer"
          >
            {{ cancelText }}
          </button>

          <button
            @click="confirm"
            type="button"
            class="px-4 py-2.5 rounded-xl bg-[#E30909] hover:bg-[#b80707] text-white font-medium text-sm transition-colors cursor-pointer shadow-lg shadow-[#E30909]/20"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

withDefaults(defineProps<Props>(), {
  title: "Вы уверены?",
  message: "Это действие нельзя будет отменить.",
  confirmText: "Да, удалить",
  cancelText: "Отмена",
});

const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => emit("confirm");
const cancel = () => emit("cancel");
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

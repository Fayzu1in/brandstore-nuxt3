<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0e1217]"
    >
      <!-- Твое лого -->
      <div class="mb-6 animate-pulse select-none">
        <span class="text-2xl sm:text-3xl font-bold tracking-wider text-white">
          <span class="text-white bg-[#E30909] px-2 py-1 rounded-sm"
            >BRAND</span
          >
          <span class="text-white px-1 py-1">STORE</span>
        </span>
      </div>

      <!-- Анимированный лоадер под логотипом -->
      <div class="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
        <div class="loader-line bg-[#E30909] h-full w-full rounded-full"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.loader-line {
  animation: loading 1.4s infinite ease-in-out;
  transform-origin: 0% 50%;
}

@keyframes loading {
  0% {
    transform: translateX(-100%) scaleX(0.2);
  }
  50% {
    transform: translateX(0%) scaleX(0.5);
  }
  100% {
    transform: translateX(100%) scaleX(0.2);
  }
}

.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>

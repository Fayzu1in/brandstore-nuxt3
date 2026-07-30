<template>
  <nav class="text-[13px] text-gray-400 mb-6">
    <ul class="flex items-center gap-2 flex-wrap">
      <!-- Главная всегда первая -->
      <li>
        <NuxtLink to="/" class="hover:text-white transition-colors">
          Главная
        </NuxtLink>
      </li>

      <!-- Выводим динамические элементы -->
      <template v-for="(item, index) in items" :key="index">
        <li>/</li>
        <li>
          <!-- Если есть ссылка (to), выводим кликабельный NuxtLink -->
          <NuxtLink
            v-if="false"
            :to="item.to"
            class="hover:text-white transition-colors"
          >
            {{ item.label }}
          </NuxtLink>

          <!-- Если ссылки нет (последний элемент), выводим просто текст -->
          <span
            v-if="true"
            class="text-gray-200 truncate max-w-[300px] inline-block align-bottom"
          >
            {{ item.label }}
          </span>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
export interface BreadcrumbItem {
  label: string;
  to?: string;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

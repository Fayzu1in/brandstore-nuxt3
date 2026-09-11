<template>
  <slot
    :data="data"
    :payload="payload"
    :items="items"
    :title="title"
    :catalog-link="catalogLink"
    :pending="pending"
    :error="error"
    :refresh="refresh"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  // 1. Либо передаем готовую функцию fetcher (как было)
  fetcher?: () => Promise<any>;
  // 2. Либо передаем endpoint и params
  endpoint?: string;
  params?: Record<string, any>;
  // Уникальный ключ для кэша Nuxt
  cacheKey: string;
}>();

// Если передан endpoint, используем ваш нукстовский $fetch / useFetch, иначе вызывем fetcher
const { data, pending, error, refresh } = await useAsyncData(
  `${props.cacheKey}-${JSON.stringify(props.params || {})}`,
  () => {
    if (props.fetcher) {
      return props.fetcher();
    }

    if (props.endpoint) {
      // Исполнение запроса по endpoint + params через api или $fetch
      // Если у вас базовый URL задан в $fetch / useNuxtApp().$api
      return $fetch(props.endpoint, {
        baseURL: "https://api.brandstore.uz/api",
        params: props.params,
      });
    }

    throw new Error("DataLoader: передайте fetcher или endpoint");
  },
  {
    watch: [() => props.params], // Авто-перезапрос при изменении параметров
  },
);

// Извлекаем чистые данные
const payload = computed(() => (data.value as any)?.data ?? data.value);

// Авто-доставание массива товаров
const items = computed(() => {
  if (Array.isArray(payload.value)) return payload.value;
  return (
    payload.value?.product_request ??
    payload.value?.products ??
    payload.value?.data ??
    []
  );
});

const title = computed(() => (data.value as any)?.data?.name ?? "");

const catalogLink = computed(() => {
  const p = (data.value as any)?.data?.params || props.params;
  if (!p) return "/catalog/personal";

  return {
    path: "/catalog/personal",
    query: { ...p },
  };
});
</script>

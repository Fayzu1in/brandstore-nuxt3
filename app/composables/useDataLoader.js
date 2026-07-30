import { ref, watch, unref } from "vue";
import { api } from "~/utils/api";

export function useDataLoader({ params = {}, perPage = 12 } = {}) {
  const items = ref([]);
  const loading = ref(false);
  const page = ref(1);
  const hasMorePages = ref(true);
  const meta = ref(null);
  const error = ref(null);
  const isInitialLoading = ref(true);

  const loadMore = async () => {
    if (loading.value || !hasMorePages.value) return;

    loading.value = true;
    error.value = null;

    try {
      const currentParams = unref(params);

      const response = await api.getProducts({
        ...currentParams,
        page: page.value,
        per_page: perPage,
      });

      const newItems = response.data || [];
      meta.value = response.meta || null;

      if (page.value === 1) {
        items.value = newItems;
      } else {
        const uniqueItems = newItems.filter(
          (newItem) =>
            !items.value.some((existingItem) => existingItem.id === newItem.id),
        );
        items.value = [...items.value, ...uniqueItems];
      }

      // Проверяем наличие следующих страниц
      if (response.meta) {
        const currentPage = Number(response.meta.current_page || page.value);
        const lastPage = Number(response.meta.last_page || page.value);

        hasMorePages.value = currentPage < lastPage;
      } else {
        hasMorePages.value = newItems.length >= perPage;
      }

      // Переходим к следующей странице только если они есть
      if (hasMorePages.value) {
        page.value++;
      }
    } catch (err) {
      console.error("DataLoader error:", err);
      error.value = "Не удалось загрузить данные";
    } finally {
      loading.value = false;
      isInitialLoading.value = false;
    }
  };

  const reload = () => {
    items.value = [];
    page.value = 1;
    hasMorePages.value = true;
    isInitialLoading.value = true;
    loadMore();
  };

  watch(
    () => unref(params),
    () => {
      reload();
    },
    { deep: true },
  );

  return {
    items,
    loading,
    isInitialLoading,
    hasMorePages,
    error,
    meta,
    loadMore,
    reload,
  };
}

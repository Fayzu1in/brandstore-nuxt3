import { defineStore } from 'pinia'

// Описываем интерфейс под твою структуру API
export interface Category {
  id: number
  title: string
  slug: string
  parent_id: number | null
  level_depth: number
  image: string | null
  ad: any | null
  childs: Category[]
  name: string
  icon: string
  wicon: string
  preview: string
}

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const isLoaded = ref(false)

  // 1. Единоразовая загрузка данных
  async function fetchCategories() {
    // Если данные уже загружены или загружаются — отменяем повторный запрос
    if (isLoaded.value || isLoading.value) return

    isLoading.value = true
    try {
      const response = await $fetch<{ data: Category[] }>('https://api.brandstore.uz/api/categories')
      categories.value = response.data || []
      isLoaded.value = true
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error)
    } finally {
      isLoading.value = false
    }
  }

  // 2. Быстрый рекурсивный поиск категории по slug
  function findBySlug(items: Category[], slug: string): Category | null {
    for (const item of items) {
      if (item.slug === slug) return item
      if (item.childs?.length) {
        const found = findBySlug(item.childs, slug)
        if (found) return found
      }
    }
    return null
  }

  // Геттер поиска
  const getCategoryBySlug = computed(() => {
    return (slug: string) => findBySlug(categories.value, slug)
  })

  return {
    categories,
    isLoading,
    isLoaded,
    fetchCategories,
    getCategoryBySlug
  }
})
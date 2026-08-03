import { defineStore } from 'pinia'
import { computed, watch, onMounted } from 'vue'

export interface Product {
  id: number
  name?: string
  price?: number
  slug?: string
  [key: string]: any
}

export const useFavoritesStore = defineStore('favorites', () => {
  // 1. Используем useState от Nuxt, чтобы состояние было безопасно для SSR
  const items = useState<Product[]>('favorites_items', () => [])

  // 2. Читаем из localStorage ТОЛЬКО в браузере при монтировании
  onMounted(() => {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('favorite_products')
        if (saved) {
          items.value = JSON.parse(saved)
        }
      } catch (e) {
        console.error('Ошибка при чтении favorites из localStorage:', e)
      }
    }
  })

  // 3. Сохраняем изменения в localStorage при любом изменении массива
  if (import.meta.client) {
    watch(
      items,
      (newItems) => {
        try {
          localStorage.setItem('favorite_products', JSON.stringify(newItems))
        } catch (e) {
          console.error('Ошибка при записи favorites в localStorage:', e)
        }
      },
      { deep: true }
    )
  }

  // Массив ID для быстрой O(1) проверки
  const favoriteIds = computed(() => new Set(items.value.map((item) => item.id)))

  // Количество товаров
  const count = computed(() => items.value.length)

  // Проверка
  const isFavorite = (productId: number) => {
    return favoriteIds.value.has(productId)
  }

  // Переключение (Добавить / Удалить)
  const toggleFavorite = (product: Product) => {
    if (!product || !product.id) return

    const index = items.value.findIndex((i) => i.id === product.id)
    if (index > -1) {
      items.value.splice(index, 1)
    } else {
      items.value.push(product)
    }
  }

  // Очистка
  const clearFavorites = () => {
    items.value = []
  }

  return {
    items,
    count,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  }
})
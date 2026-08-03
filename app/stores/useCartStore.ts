import { defineStore } from 'pinia'
import { computed, watch, onMounted } from 'vue'

export interface CartItem {
  id: number
  name?: string
  price?: number
  slug?: string
  quantity: number
  [key: string]: any
}

export const useCartStore = defineStore('cart', () => {
  // 1. Безопасное для SSR состояние
  const items = useState<CartItem[]>('cart_items', () => [])

  // 2. Чтение из localStorage на клиенте
  onMounted(() => {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('cart_products')
        if (saved) {
          items.value = JSON.parse(saved)
        }
      } catch (e) {
        console.error('Ошибка при чтении cart из localStorage:', e)
      }
    }
  })

  // 3. Сохранение в localStorage
  if (import.meta.client) {
    watch(
      items,
      (newItems) => {
        try {
          localStorage.setItem('cart_products', JSON.stringify(newItems))
        } catch (e) {
          console.error('Ошибка при записи cart в localStorage:', e)
        }
      },
      { deep: true }
    )
  }

  // Общее количество позиций в корзине (учитывая quantity каждого товара)
  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + (item.quantity || 1), 0)
  )

  // Итоговая стоимость всех товаров
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => {
      const price = item.discount?.price || item.price || 0
      return sum + price * (item.quantity || 1)
    }, 0)
  )

  // Быстрая проверка: находится ли товар в корзине
  const isInCart = (productId: number) => {
    return items.value.some((item) => item.id === productId)
  }

  // Добавление товара в корзину (или увеличение quantity, если уже есть)
  const addToCart = (product: any, quantityToAdd = 1) => {
    if (!product || !product.id) return

    const existingIndex = items.value.findIndex((i) => i.id === product.id)
    if (existingIndex > -1) {
      items.value[existingIndex].quantity += quantityToAdd
    } else {
      items.value.push({
        ...product,
        quantity: quantityToAdd,
      })
    }
  }

  // Изменение количества товара
  const updateQuantity = (productId: number, delta: number) => {
    const item = items.value.find((i) => i.id === productId)
    if (item) {
      item.quantity += delta
      if (item.quantity <= 0) {
        removeFromCart(productId)
      }
    }
  }

  // Удаление товара из корзины
  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex((i) => i.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  // Полная очистка
  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    totalCount,
    totalPrice,
    isInCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }
})
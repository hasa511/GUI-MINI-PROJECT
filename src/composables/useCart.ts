import { ref, computed } from 'vue'

interface CartItem {
  product: any
  quantity: number
}

export function useCart() {
  const cartItems = ref<CartItem[]>([])
  
  // Load cart from localStorage on init
  const loadCart = () => {
    const saved = localStorage.getItem('shopora_cart')
    if (saved) {
      cartItems.value = JSON.parse(saved)
    }
  }
  
  // Save cart to localStorage
  const saveCart = () => {
    localStorage.setItem('shopora_cart', JSON.stringify(cartItems.value))
  }
  
  const addItem = (product: any) => {
    const existing = cartItems.value.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      cartItems.value.push({ product, quantity: 1 })
    }
    saveCart()
  }
  
  const removeItem = (productId: number) => {
    cartItems.value = cartItems.value.filter(item => item.product.id !== productId)
    saveCart()
  }
  
  const updateQuantity = (productId: number, quantity: number) => {
    const item = cartItems.value.find(item => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }
  
  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }
  
  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  })
  
  const cartCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0)
  })
  
  // Load cart on init
  loadCart()
  
  return {
    cartItems,
    cartTotal,
    cartCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
}
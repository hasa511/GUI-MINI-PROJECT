<template>
  <div 
    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
    @click="emit('view-detail', product.id)"
  >
    <!-- Product Image -->
    <div class="relative overflow-hidden bg-gray-100 h-48">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
      <div class="absolute top-2 right-2">
        <span class="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
          {{ product.category }}
        </span>
      </div>
    </div>
    
    <div class="p-4">
      <!-- Brand -->
      <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">{{ product.brand }}</p>
      
      <!-- Title -->
      <h3 class="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">{{ product.title }}</h3>
      
      <!-- Rating -->
      <div class="flex items-center gap-2 mb-2">
        <div class="flex items-center">
          <span class="text-yellow-400 text-sm">★</span>
          <span class="text-sm font-medium text-gray-700 ml-1">{{ product.rating }}</span>
        </div>
        <span class="text-xs text-gray-400">({{ product.stock }} left)</span>
      </div>
      
      <!-- Price -->
      <div class="flex items-baseline gap-2 mb-3">
        <span class="text-emerald-600 font-bold text-xl">${{ product.price }}</span>
        <span v-if="originalPrice" class="text-gray-400 line-through text-sm">${{ originalPrice }}</span>
        <span v-if="discount" class="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full">{{ discount }}% off</span>
      </div>
      
      <!-- Add to Cart Button -->
      <button 
        @click.stop="addToCart"
        class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-[1.02]"
      >
        🛒 Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../types'
import { useCart } from '../composables/useCart'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  'view-detail': [id: number]
}>()

const { addItem } = useCart()

// Calculate original price and discount percentage if available
const originalPrice = computed(() => {
  if (props.product.discountPercentage) {
    return Math.round(props.product.price / (1 - props.product.discountPercentage / 100))
  }
  return null
})

const discount = computed(() => {
  if (props.product.discountPercentage) {
    return Math.round(props.product.discountPercentage)
  }
  return null
})

const addToCart = () => {
  addItem(props.product)
  // You can add a toast notification here
  console.log('Added to cart:', props.product.title)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
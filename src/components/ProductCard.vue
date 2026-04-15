<script setup lang="ts">
import type { Product } from '../types/Product';


defineProps<{
  product: Product
}>();
</script>

<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-pink-100">
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover" />
    
    <div class="p-4">
      <span class="text-xs font-semibold text-pink-500 uppercase">{{ product.brand }}</span>
      <h3 class="text-lg font-bold text-gray-800 truncate">{{ product.title }}</h3>
      <p class="text-sm text-gray-600 line-clamp-2 mt-1">{{ product.description }}</p>
      
      <div class="mt-4 flex justify-between items-center">
        <span class="text-xl font-bold text-pink-600">${{ product.price }}</span>
        <button class="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-600">
          View Details
        </button>
      </div>
    </div>
  </div>
</template>
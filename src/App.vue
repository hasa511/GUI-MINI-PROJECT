<script setup lang="ts">
import { onMounted } from 'vue';
import { useProducts } from './composables/useProducts'; // The logic you created
import ProductCard from './components/ProductCard.vue'; // The component you created

// Getting required items from the composable
const { products, loading, fetchSkincare } = useProducts();

// Fetch data when component mounts
onMounted(() => {
  fetchSkincare();
});
</script>

<template>
  <div class="min-h-screen bg-pink-50">
    <header class="bg-white shadow-md p-6 sticky top-0 z-10">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-3xl font-extrabold text-pink-600 tracking-tight">
          GLOW & GRACE <span class="text-gray-400 font-light">| Skincare</span>
        </h1>
      </div>
    </header>

    <main class="container mx-auto p-6">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        <p class="ml-4 text-pink-600 font-medium">Loading products...</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </main>
  </div>
</template>

<style>
/* No scoped style needed here because we are using Tailwind */
body {
  @apply antialiased;
}
</style>
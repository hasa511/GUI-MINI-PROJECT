<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from './types/Product';
import ProductCard from './components/ProductCard.vue';

const products = ref<Product[]>([]);
const loading = ref(true);

const fetchBeautyProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/category/beauty');
    const data = await response.json();
    products.value = data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBeautyProducts();
});
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="bg-white border-b sticky top-0 z-50">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-pink-600 tracking-tight">GLOW & GRACE | Skincare</h1>
        <nav class="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          <a href="#" class="hover:text-pink-600">Skincare</a>
          <a href="#" class="hover:text-pink-600">Fragrances</a>
          <a href="#" class="hover:text-pink-600">Collections</a>
        </nav>
        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-400 hover:text-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <section class="bg-pink-50 py-12">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-extrabold text-gray-900 md:text-5xl">Beauty Redefined.</h2>
        <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Discover our curated collection of premium beauty and skincare essentials.</p>
      </div>
    </section>

    <main class="container mx-auto px-4 py-12">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        <p class="mt-4 text-gray-500 font-medium">Loading collection...</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </main>

    <footer class="bg-white border-t py-8 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Glow Scene Beauty SPA Project. CS3404 Computer Engineering.</p>
      </div>
    </footer>
  </div>
</template>
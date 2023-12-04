<template>
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold mb-4">Browse Recipes by Category</h1>
      <div class="flex flex-wrap gap-4">
        <category-tag v-for="category in categories" :key="category" :category="category" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import CategoryTag from '../components/CategoryTag.vue';
  import recipeService from '@/services/recipeService.js';
  
  const categories = ref([]);
  
  onMounted(async () => {
    categories.value = await recipeService.getCategories();
  });
  </script>
  
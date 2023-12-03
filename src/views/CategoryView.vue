<template>
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold mb-4">Recipes in Category: {{ category }}</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <recipe-card v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import RecipeCard from '../components/RecipeCard.vue';
  import recipeService from '@/services/recipeService.js';
  
  const route = useRoute();
  const category = route.params.category;
  const recipes = ref([]);
  
  onMounted(async () => {
    recipes.value = await recipeService.getRecipesByCategory(category);
  });
  </script>
  
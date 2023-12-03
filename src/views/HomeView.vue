<template>
  <div class="container mx-auto px-4">
    <h2 class="text-2xl font-bold my-4">Hot Recipes</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <RecipeCard v-for="recipe in hotRecipes" :key="recipe.id" :recipe="recipe" />
    </div>

    <h2 class="text-2xl font-bold my-4">New Recipes</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <RecipeCard v-for="recipe in allRecipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>

<script setup>
// HomeView.vue
import { ref, onMounted } from 'vue';
import RecipeCard from '../components/RecipeCard.vue';
import recipeService from '@/services/recipeService.js';

const allRecipes = ref([]);
const hotRecipes = ref([]);

onMounted(async () => {
  try {
    const { allRecipes: loadedAllRecipes, hotRecipes: loadedHotRecipes } = await recipeService.getAllRecipes();
    allRecipes.value = loadedAllRecipes;
    hotRecipes.value = loadedHotRecipes;
  } catch (error) {
    console.error("Error loading recipes:", error);
  }
});
</script>


<template>
  <div class="container mx-auto px-4 pb-10" ref="scrollContainer">
    <h2 class="font-dm-serif text-4xl font-bold py-5 my-6">Hot Recipes</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <RecipeCard v-for="recipe in hotRecipes" :key="recipe.id" :recipe="recipe" />
    </div>

    <h2 class="font-dm-serif text-4xl font-bold my-6 py-5 pt-10">New Recipes</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <RecipeCard v-for="recipe in displayedRecipes" :key="recipe.id" :recipe="recipe" />
    </div>
    <div v-if="isLoading && !allRecipesLoaded" class="text-center mt-4">
      Loading more recipes...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RecipeCard from '../components/RecipeCard.vue';
import recipeService from '@/services/recipeService.js';

const allRecipes = ref([]);
const displayedRecipes = ref([]);
const hotRecipes = ref([]);
const isLoading = ref(false);
const scrollContainer = ref(null);
let canLoadMore = true;

const allRecipesLoaded = ref(false);

const loadMoreRecipes = () => {
  if (canLoadMore && !allRecipesLoaded.value) {
    isLoading.value = true;
    canLoadMore = false;
    setTimeout(() => {
      const nextIndex = displayedRecipes.value.length;
      const nextRecipes = allRecipes.value.slice(nextIndex, nextIndex + 12);
      if (nextRecipes.length) {
        displayedRecipes.value = [...displayedRecipes.value, ...nextRecipes];
      } else {
        allRecipesLoaded.value = true; // Set to true when all recipes are loaded
      }
      isLoading.value = false;
      canLoadMore = true;
    }, 1000); // Delay of 1000ms
  }
};

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadMoreRecipes();
  }
};


onMounted(async () => {
  const { allRecipes: loadedAllRecipes, hotRecipes: loadedHotRecipes } = await recipeService.getAllRecipes();
  allRecipes.value = loadedAllRecipes;
  hotRecipes.value = loadedHotRecipes;
  displayedRecipes.value = loadedAllRecipes.slice(0, 12); // Initial 12 recipes
  window.addEventListener('scroll', handleScroll);
});
</script>

<style>
/* Additional styles can be added here */
</style>

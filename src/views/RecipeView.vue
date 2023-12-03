<template>
    <div class="container mx-auto px-4 py-6">
      <div v-if="recipe.id" class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <!-- Responsive layout -->
        <div class="md:flex">
          <!-- Image on the left (or top on small screens) -->
          <div class="md:w-1/2">
            <img :src="recipe.image" alt="Recipe Image" class="w-full h-auto">
          </div>
          <!-- Details on the right (or bottom on small screens) -->
          <div class="md:w-1/2 p-4">
            <h1 class="font-dm-serif text-2xl md:text-3xl font-bold mb-2">{{ recipe.title }}</h1>
            <div class="mb-4">
              <h2 class="font-dm-serif text-lg md:text-xl font-semibold mb-1">Ingredients</h2>
              <ul class="list-disc ml-6 text-base md:text-lg">
                <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
              </ul>
            </div>
            <div class="mb-4">
              <h2 class="font-dm-serif text-lg md:text-xl font-semibold mb-1">Instructions</h2>
              <p class="ml-4 text-base md:text-lg">{{ recipe.instructions }}</p>
            </div>
            <div>
              <h2 class="text-lg md:text-xl font-semibold mb-1">Categories</h2>
              <category-tag v-for="category in recipe.categories" :key="category" :category="category" />
            </div>
            <div class="mt-4">
              <h2 class="font-dm-serif text-lg md:text-xl font-semibold mb-1">Cooking Time</h2>
              <p class="ml-4 text-base md:text-lg">{{ recipe.cookingTime }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading recipe...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import recipeService from '@/services/recipeService.js';
  import CategoryTag from '@/components/CategoryTag.vue';
  
  const route = useRoute();
  const recipe = ref({});
  
  onMounted(async () => {
    try {
      const fetchedRecipe = await recipeService.getRecipeById(route.params.id);
      if (fetchedRecipe) {
        recipe.value = fetchedRecipe;
      } else {
        console.error("Recipe not found");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  });
  </script>
  
  <style scoped>
  .custom-font {
  font-family: 'YourCustomFont', sans-serif;
}
  </style>
  
<template>
  <div class="container mx-auto px-4">
    <h2 class="text-2xl font-bold my-4">Hot Recipes</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <RecipeCard v-for="recipe in hotRecipes" :key="recipe.id" :recipe="recipe" />
    </div>

    <h2 class="text-2xl font-bold my-4">New Recipes</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <RecipeCard v-for="recipe in newRecipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'

// Mock data for hot recipes
const hotRecipes = ref([
  {
    id: 1,
    title: "Classic Margherita Pizza",
    image: "path/to/margherita-pizza.jpg", // Replace with actual image path
    description: "A classic Italian favorite with fresh mozzarella and basil.",
    category: "Italian"
  },
  // ... Add more hot recipes here
])

// Mock data for new recipes
const newRecipes = ref([
  {
    id: 2,
    title: "Vegan Chocolate Cake",
    image: "path/to/vegan-chocolate-cake.jpg", // Replace with actual image path
    description: "Rich and moist chocolate cake that's perfect for all.",
    category: "Dessert"
  },
  // ... Add more new recipes here
])
</script>
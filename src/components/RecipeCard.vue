<template>
    <div @click="goToRecipeDetail(recipe.id)" class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
      <div class="image-container">
        <img class="recipe-image" :src="recipe.image" alt="Recipe Image">
      </div>
      <div class="px-6 py-4">
        <div class="font-dm-serif font-bold text-xl mb-2">{{ recipe.title }}</div>
      </div>
      <div class="flex justify-between items-center px-6 pb-2">
        <span v-if="recipe.categories && recipe.categories.length" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{{ recipe.categories[0] }}
        </span>
        <star-rating :rating="recipe.rating"></star-rating>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  import { useRouter } from 'vue-router'
  import StarRating from './StarRating.vue'
  
  const props = defineProps({
    recipe: {
      type: Object,
      required: true
    }
  });
  
  const router = useRouter()
  
  const goToRecipeDetail = (id) => {
    router.push({ name: 'RecipeView', params: { id } })
  }
  </script>

<style scoped>
.image-container {
  width: 100%; /* Adjust the width as needed */
  height: 0;
  padding-top: 100%; /* This creates a 1:1 aspect ratio */
  position: relative;
}

.recipe-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the area without distortion */
}
</style>
  
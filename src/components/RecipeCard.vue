<template>
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div @click="goToRecipeDetail(recipe.id)" class="image-container cursor-pointer">
        <img class="recipe-image" :src="recipe.image" alt="Recipe Image">
      </div>
      <div class="px-6 py-4">
        <div class="flex justify-between items-center">
            <div class="font-dm-serif text-2xl font-bold mb-2">{{ recipe.title }}</div>
            <button
            v-if="$route.name === 'ManagePost'"
            @click="deleteRecipeFromService(recipe.id)"
            class="btn-delete"
            >
            <!--Delete Icon-->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            </button>
        </div>
    </div>
      <div class="flex justify-between items-center px-6 pb-2">
        <category-tag v-if="recipe.categories && recipe.categories.length" :category="recipe.categories[0]" />
        <star-rating :rating="recipe.rating"></star-rating>
      </div>
    </div>
  </template>
  
  
<script setup>
  import { useRouter } from 'vue-router'
  import StarRating from './StarRating.vue'
  import CategoryTag from '@/components/CategoryTag.vue';
  import recipeService from '@/services/recipeService';
  import userService from '@/services/userService';
  import { auth } from '@/js/firebase.js';
  
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

  const emit = defineEmits(['recipeDeleted'])

  const deleteRecipeFromService = async (id) => {
    try {
        console.log("Attempting to delete recipe with id:", id);
        await recipeService.deleteRecipe(id);
        emit('recipeDeleted', id);
        await userService.deleteRecipeFromUser(auth.currentUser.uid, id);
    } catch (error) {
        console.error("Error deleting recipe:", error);
    }
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
  
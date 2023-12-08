<script setup>
import userService from '@/services/userService.js';
import { onMounted, ref } from 'vue';
import { auth } from '@/js/firebase.js';
import RecipeCard from '../components/RecipeCard.vue';

const userRecipes = ref([]);
const userId = auth.currentUser.uid;
const displayName = ref('');

onMounted(async () => {
    userRecipes.value = await userService.getUserRecipes(userId);
    displayName.value = await userService.getDisplayNameByUid(userId);
})

const handleRecipeDeleted = (id) => {
    userRecipes.value = userRecipes.value.filter(recipe => recipe.id !== id);
}

</script>

<template>
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold mb-4">Recipes By {{ displayName }}</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <recipe-card
          v-for="recipe in userRecipes"
          :key="recipe.key"
          :recipe="recipe"
          @recipeDeleted="handleRecipeDeleted"
        />
      </div>
    </div>
</template>
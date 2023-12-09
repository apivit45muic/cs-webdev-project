<script setup>
import recipeService from '@/services/recipeService.js';
import userService from '@/services/userService';
import { ref, onMounted, computed, reactive } from 'vue';

const recipes = ref([]);
const ingredients = ref([]);
const recipeTitles = ref([]);
const recipeAuthors = ref([]);

const selectedRecipes = reactive({
  Monday: ['', '', ''],
  Tuesday: ['', '', ''],
  Wednesday: ['', '', ''],
  Thursday: ['', '', ''],
  Friday: ['', '', ''],
  Saturday: ['', '', ''],
  Sunday: ['', '', '']
});

onMounted(async () => {
  const result = await recipeService.getAllRecipesArray();
  recipes.value = result;
  recipeTitles.value = result.map((recipe) => recipe.title);
  recipeAuthors.value = await Promise.all(result.map(recipe => userService.getDisplayNameByUid(recipe.authorId)));
});

const fetchIngredients = async () => {
  ingredients.value = []; // Clear the ingredients array
  for (const day in selectedRecipes) {
    for (const recipeId of selectedRecipes[day]) {
      if (recipeId) {
        const recipeIngredients = await recipeService.getIngredientsFromRecipe(recipeId);
        if (recipeIngredients) {
          ingredients.value = [...ingredients.value, ...recipeIngredients]; // Add the ingredients to the array
        }
      }
    }
  }
};

const recipeOptions = computed(() => {
  return recipes.value.map(recipe => ({
    id: recipe.id,
    text: `${recipe.title} by ${recipeAuthors.value[recipeTitles.value.indexOf(recipe.title)]}`
  }));
});

const clearRecipes = () => {
    for (let day in selectedRecipes) {
      selectedRecipes[day] = ['','',''];
      ingredients.value = [];
    }
}
</script>

<template>
  <div class="container mx-8 my-8">
    <h1 class="text-2xl font-bold mb-4">Weekly Planner</h1>
  </div>

  <div class="flex justify-between px-8">
    <!--Days Column-->
    <div class="w-1/2">
      <div v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']" :key="day" class="mb-4">
          <h2 class="font-bold">{{ day }}</h2>
          <div class="flex flex-col">
            <div v-for="(recipe, index) in selectedRecipes[day]" :key="index">
              <select v-model="selectedRecipes[day][index]" v-if="recipeOptions.length > 0" :name="`recipes-${day}-${index}`" :id="`recipes-${day}-${index}`" class="mt-2 w-64 border rounded" @change="fetchIngredients(day)">
                <option disabled value="">Select a recipe</option>
                <option v-for="option in recipeOptions" :key="option.id" :value="option.id">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button @click="clearRecipes" class="mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Clear All Selected Recipes
        </button>
    </div>

    <!--Ingredients Column-->
    <div class="w-1/2">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold mb-4">Ingredients</h1>
        <ul>
          <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: disc;
}
</style>
<script setup>
import recipeService from '@/services/recipeService.js';
import userService from '@/services/userService';
import { ref, onMounted, computed, watch } from 'vue';
import { useRecipesStore } from '@/stores/recipes';

const recipes = ref([]);
const recipeTitles = ref([]);
const recipeAuthors = ref([]);
const ingredientsText = ref('');

const store = useRecipesStore();
const selectedRecipes = store.selectedRecipes;
const ingredients = store.ingredients;

const ingredientsRef = ref(ingredients);

onMounted(async () => {
  const result = await recipeService.getAllRecipesArray();
  recipes.value = result;
  recipeTitles.value = result.map((recipe) => recipe.title);
  recipeAuthors.value = await Promise.all(result.map(recipe => userService.getDisplayNameByUid(recipe.authorId)));
});

const fetchIngredients = async () => {
  const newIngredients = []; // Create a new ingredients array
  for (const day in store.selectedRecipes) {
    for (const recipeId of store.selectedRecipes[day]) {
      if (recipeId) {
        const recipeIngredients = await recipeService.getIngredientsFromRecipe(recipeId);
        if (recipeIngredients) {
          newIngredients.push(...recipeIngredients);
        }
      }
    }
  }
  store.setIngredients(newIngredients);
  ingredientsRef.value = newIngredients;
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
      ingredients.value.splice(0);
    }
}

const generateIngredientsText = () => {
  if (ingredients.length > 0) {
    const ingredientsText = `data:text/plain;charset=utf-8,${encodeURIComponent(ingredients.join('\n'))}`;
    const link = document.createElement('a');
    link.href = ingredientsText;
    link.download = 'ingredients.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

watch(ingredients, () => {
  URL.revokeObjectURL(ingredientsText.value);
});

watch(selectedRecipes, (newSelectedRecipes) => {
  store.setSelectedRecipes(newSelectedRecipes);
});

const handleRecipeSelection = async (day, meal, recipeId) => {
  store.selectedRecipes[day][meal] = recipeId;
  
  await fetchIngredients();
}

watch(ingredients, (newIngredients) => {
  store.setIngredients(newIngredients);
});
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
              <select v-model="selectedRecipes[day][index]" v-if="recipeOptions.length > 0" :name="`recipes-${day}-${index}`" :id="`recipes-${day}-${index}`" class="mt-2 w-64 border rounded" @change="handleRecipeSelection(day, index, selectedRecipes[day][index])">
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
      <div class="container mb-4">
        <h1 class="text-2xl font-bold mb-4">Ingredients</h1>
        <ul>
          <li v-for="ingredient in ingredientsRef" :key="ingredient">{{ ingredient }}</li>
        </ul>
      </div>
      <!-- Save button -->
      <button @click="generateIngredientsText" class="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download Ingredients List
      </button>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: disc;
}
</style>
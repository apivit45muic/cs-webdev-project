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

const ingredientsRef = ref([]);

onMounted(async () => {
  const result = await recipeService.getAllRecipesArray();
  recipes.value = result;
  recipeTitles.value = result.map((recipe) => recipe.title);
  recipeAuthors.value = await Promise.all(result.map(recipe => userService.getDisplayNameByUid(recipe.authorId)));
  await fetchIngredients();
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
      ingredientsRef.value = [];
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
  <div class="planner-class">
    <div class="container mx-auto my-8">
      <h1 class="text-2xl font-bold mb-6">Weekly Planner</h1>
      <div class="flex gap-10">
        <!-- Days Column -->
        <div class="flex-1">
          <div v-for="day in ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']" :key="day" class="mb-6">
            <h2 class="font-bold text-lg mb-2">{{ day }}</h2>
            <div class="flex flex-col gap-2">
              <div v-for="(recipe, index) in selectedRecipes[day]" :key="index">
                <select v-model="selectedRecipes[day][index]" v-if="recipeOptions.length > 0" :name="`recipes-${day}-${index}`" :id="`recipes-${day}-${index}`" class="w-full border rounded p-2" @change="handleRecipeSelection(day, index, $event.target.value)">
                  <option disabled value="">Select a recipe</option>
                  <option v-for="option in recipeOptions" :key="option.id" :value="option.id">
                    {{ option.text }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <button @click="clearRecipes" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Clear All Selected Recipes
          </button>
        </div>

        <!-- Ingredients Column -->
        <div class="flex-1">
          <h1 class="text-2xl font-bold mb-6">Ingredients</h1>
          <ul class="mb-6">
            <li v-for="ingredient in ingredientsRef" :key="ingredient" class="list-disc ml-5">{{ ingredient }}</li>
          </ul>
          <button @click="generateIngredientsText" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download Ingredients List
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
ul {
  list-style-type: disc;
}
</style>
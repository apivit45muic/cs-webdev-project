import { getDatabase, ref as dbRef, get, child, update } from "firebase/database";
import { realtimeDb } from '@/js/firebase'; // Adjust the path to your firebase.js

// Fetch all recipes
const getAllRecipes = async () => {
  try {
    const snapshot = await get(child(dbRef(realtimeDb), 'recipes/'));
    if (snapshot.exists()) {
      let recipes = [];
      snapshot.forEach(childSnapshot => {
        let recipe = { id: childSnapshot.key, ...childSnapshot.val() };
        recipes.push(recipe);
      });

      // Sort recipes by timestamp (assuming each recipe has a 'timestamp' field)
      recipes.sort((a, b) => b.timestamp - a.timestamp);

      // Get hot recipes (top 5 rated, as an example)
      const hotRecipes = [...recipes].sort((a, b) => b.rating - a.rating).slice(0, 5);

      return { allRecipes: recipes, hotRecipes };
    } else {
      console.log("No recipes available");
      return { allRecipes: [], hotRecipes: [] };
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

// Fetch a single recipe by ID
const getRecipeById = async (id) => {
  try {
    const snapshot = await get(child(dbRef(realtimeDb), `recipes/${id}`));
    if (snapshot.exists()) {
      return { id: snapshot.key, ...snapshot.val() };
    } else {
      console.log("No recipe available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

const getRecipesByCategory = async (category) => {
  try {
    const snapshot = await get(child(dbRef(realtimeDb), 'recipes/'));
    if (snapshot.exists()) {
      let filteredRecipes = [];
      snapshot.forEach(childSnapshot => {
        let recipe = { id: childSnapshot.key, ...childSnapshot.val() };
        if (recipe.categories && recipe.categories.includes(category)) {
          filteredRecipes.push(recipe);
        }
      });
      return filteredRecipes;
    } else {
      console.log("No recipes available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    throw error;
  }
};

const getCategories = async () => {
  try {
    const snapshot = await get(child(dbRef(realtimeDb), 'categories/'));
    if (snapshot.exists()) {
      const categoriesObj = snapshot.val();
      const categories = Object.values(categoriesObj);
      categories.sort(); // Sort categories alphabetically
      return categories;
    } else {
      console.log("No categories available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const updateRating = async (id, newRating) => {
  const recipeRef = dbRef(getDatabase(), `recipes/${id}`);
  try {
    await update(recipeRef, { rating: newRating });
  } catch (error) {
    console.error("Error updating rating:", error);
    throw error;
  }
};

export default {
  getAllRecipes,
  getRecipeById,
  getRecipesByCategory,
  getCategories,
  updateRating
};

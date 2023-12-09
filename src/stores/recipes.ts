// store/recipes.ts
import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useRecipesStore = defineStore({
    id: 'recipes',
    state: () => ({
        selectedRecipes: {
            Monday: ['', '', ''],
            Tuesday: ['', '', ''],
            Wednesday: ['', '', ''],
            Thursday: ['', '', ''],
            Friday: ['', '', ''],
            Saturday: ['', '', ''],
            Sunday: ['', '', '']
        },
        ingredients: reactive([]) as any
    }),
    actions: {
        setSelectedRecipes(selectedRecipes: any) {
            this.selectedRecipes = selectedRecipes
        },
        setIngredients(ingredients: any) {
            this.ingredients = ingredients
          }
    }
})
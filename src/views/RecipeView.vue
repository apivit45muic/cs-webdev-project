<template>
    <div class="container mx-auto px-4">
      <div v-if="recipe.id" class="max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">{{ recipe.title }}</h1>
        <img :src="recipe.image" alt="Recipe Image" class="w-full h-auto mb-4 rounded-lg">
        <p class="text-lg">{{ recipe.description }}</p>
        <div class="mt-4">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{{ recipe.category }}</span>
          <!-- Add more tags or details here -->
        </div>
      </div>
      <div v-else>
        <p>Loading recipe...</p>
      </div>
    </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const recipe = ref({})
  
  onMounted(() => {
    // Replace this with your actual API call or data fetching logic
    const fetchRecipe = async (id) => {
      const mockRecipe = {
        id: id,
        title: "Classic Margherita Pizza",
        image: "path/to/margherita-pizza.jpg",
        description: "A classic Italian favorite with fresh mozzarella and basil.",
        category: "Italian"
      };
      // Simulate an API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockRecipe;
    };
  
    fetchRecipe(route.params.id).then(data => {
        console.log("Fetched data:", data); // Log the fetched data for debugging
        recipe.value = data;
    });
  })
  </script>
  
  <style scoped>
  /* Add any styling here */
  </style>
  
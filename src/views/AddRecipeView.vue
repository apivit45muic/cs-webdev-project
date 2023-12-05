<template>
  <div class="container mx-auto px-4 py-6" style="max-width: 768px">
    <h1 class="text-2xl font-bold mb-4">Add New Recipe</h1>
    <div class="mx-auto" >
      <form @submit.prevent="addRecipe" class="space-y-4">
        <!-- Recipe Title Field -->
        <div>
          <label class="block mb-2 font-semibold">Recipe Title</label>
          <input
            v-model="recipe.title"
            type="text"
            placeholder="Recipe Title"
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <!-- Ingredients Fields -->
        <div>
          <label class="block mb-2 font-semibold">Ingredients</label>
          <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="relative mb-2">
            <input
              v-model="recipe.ingredients[index]"
              type="text"
              placeholder="Ingredient"
              class="w-full px-3 py-2 border rounded pr-10"
            />
            <button
              @click.prevent="removeIngredient(index)"
              class="absolute inset-y-0 right-0 px-3 text-red-500"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
          <div>
            <button
              @click.prevent="addIngredient"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Ingredient
            </button>
          </div>
        </div>

        <div>
          <label class="block mb-2 font-semibold">Instructions</label>
          <textarea
            v-model="recipe.instructions"
            rows="4"
            placeholder="Cooking instructions"
            class="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label class="block mb-2 font-semibold">Cooking Time</label>
          <input
            v-model="recipe.cookingTime"
            type="text"
            placeholder="e.g., 30 minutes"
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label class="block mb-2 font-semibold">Upload Image</label>
          <input
            type="file" ref="myfile"
            @change="onImageChange"
            class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>

        <button
  type="button" 
  @click="uploadImage"
  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
>
  Upload Image
</button>

        <div class="mt-4">
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { storage } from '@/js/firebase.js';

// Define a ref to store the URL of the current image
const currentImageUrl = ref('')

const recipe = ref({
  title: '',
  ingredients: [''], // Start with one empty ingredient field
  instructions: '',
  cookingTime: '',
  imageUrl: '',
  rating: 0,
})

const addIngredient = () => {
  recipe.value.ingredients.push('') // Add a new empty ingredient field
}

const removeIngredient = (index) => {
  recipe.value.ingredients.splice(index, 1) // Remove the ingredient at the given index
}

const image = ref(null)

const onImageChange = (event) => {
  image.value = event.target.files[0];
  console.log("Image selected:", image.value); // Debugging log
};

const uploadImage = async () => {
  console.log("Uploading Image");
  if (!image.value) {
    alert('No image selected');
    return;
  }

  const fileName = `${new Date().getTime()}-${image.value.name}`;
  const imageRef = storageRef(storage, `recipes/${fileName}`);

  try {
    // Upload the file to the reference
    const uploadResult = await uploadBytes(imageRef, image.value);
    console.log('Uploaded a blob or file!');

    // Get the download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);
    console.log('File available at', downloadURL);

    // Set the imageUrl in your recipe object
    recipe.value.imageUrl = downloadURL;
    currentImageUrl.value = downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};



const addRecipeToDatabase = async () => {
  const database = getDatabase();
  const recipesRef = dbRef(database, 'recipes');
  
  try {
    // Adding the recipe to Firebase Realtime Database
    const newRecipeRef = await push(recipesRef, recipe.value);
    console.log('New recipe added with ID:', newRecipeRef.key);

    router.push('/');
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
};

const addRecipe = async () => {
  console.log("Adding Recipe");
  if (!recipe.value.title || !recipe.value.ingredients.length || !recipe.value.instructions || !recipe.value.cookingTime) {
    alert("Please complete all fields.");
    return;
  }

  // Ensure that an image has been uploaded
  if (!currentImageUrl.value) {
    alert("Please upload an image.");
    return;
  }

  try {
    // Call the function to add the recipe to the database
    await addRecipeToDatabase();
  } catch (error) {
    console.error("Error submitting recipe: ", error);
  }
};


const deleteImage = async (imageUrl) => {
  const storage = getStorage()
  const imageRef = storageRef(storage, imageUrl)

  try {
    await deleteObject(imageRef)
    console.log('Old image deleted successfully')
  } catch (error) {
    console.error('Error deleting old image: ', error)
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-6" style="max-width: 768px">
    <h1 class="text-2xl font-bold mb-4">Add New Recipe</h1>
    <div class="mx-auto">
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
          <label class="block mb-2 font-semibold">Category</label>
          <input
            v-model="categorySearch"
            type="text"
            placeholder="Search category"
            class="w-full px-3 py-2 border rounded"
            @input="filterCategories"
          />
          <!-- Show only when there's at least one character in the text box -->
          <ul
            v-if="categorySearch.length > 0 && filteredCategories.length"
            class="border rounded mt-2"
          >
            <li
              v-for="category in filteredCategories"
              :key="category"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              @click="addCategory(category)"
            >
              {{ category }}
            </li>
          </ul>
        </div>
        <div v-if="recipe.categories.length" class="mt-4">
          <span
            v-for="(category, index) in recipe.categories"
            :key="index"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {{ category }}
            <button @click="removeCategory(index)">×</button>
          </span>
        </div>

        <div>
          <label class="block mb-2 font-semibold">Upload Image</label>
          <input
            type="file"
            ref="myfile"
            @change="onImageChange"
            class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>

        <div class="flex items-center">
          <button
            type="button"
            @click="uploadImage"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload Image
          </button>

          <p
            v-if="uploadStatus"
            :class="{
              'text-green-500': uploadStatus.type === 'success',
              'text-red-500': uploadStatus.type === 'error'
            }"
            class="ml-2"
          >
            {{ uploadStatus.message }}
          </p>
        </div>

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
import { ref, onMounted, computed } from 'vue'
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { getDatabase, ref as dbRef, push, get, set } from 'firebase/database'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { storage, auth } from '@/js/firebase.js'
import router from '@/router/index.ts'
import { getAuth } from 'firebase/auth';
import userService from '@/services/userService'

const userId = auth.currentUser.uid

// Define a ref to store the URL of the current image
const currentImageUrl = ref('')

const uploadStatus = ref('')

const recipe = ref({
  title: '',
  ingredients: [''], // Start with one empty ingredient field
  instructions: '',
  cookingTime: '',
  image: '',
  rating: 0,
  categories: []
})

const categorySearch = ref('')
const allCategories = ref([]) // Assuming this gets populated somehow

const filteredCategories = computed(() => {
  return allCategories.value.filter((category) =>
    category.toLowerCase().includes(categorySearch.value.toLowerCase())
  )
})

const fetchCategories = async () => {
  const db = getDatabase()
  const categoriesRef = dbRef(db, 'categories')
  try {
    const snapshot = await get(categoriesRef)
    if (snapshot.exists()) {
      allCategories.value = snapshot.val()
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

onMounted(fetchCategories)

onMounted(fetchCategories)

const filterCategories = () => {
  filteredCategories.value = allCategories.value.filter((category) =>
    category.toLowerCase().includes(categorySearch.value.toLowerCase())
  )
}

const addCategory = (category) => {
  if (!recipe.value.categories.includes(category)) {
    recipe.value.categories.push(category)
  }
  categorySearch.value = ''
  filteredCategories.value = []
}

const removeCategory = (index) => {
  recipe.value.categories.splice(index, 1)
}

const addIngredient = () => {
  recipe.value.ingredients.push('') // Add a new empty ingredient field
}

const removeIngredient = (index) => {
  recipe.value.ingredients.splice(index, 1) // Remove the ingredient at the given index
}

const image = ref(null)

const onImageChange = (event) => {
  image.value = event.target.files[0]
  console.log('Image selected:', image.value) // Debugging log
}

const uploadImage = async () => {
  console.log('Uploading Image')
  if (!image.value) {
    alert('No image selected')
    return
  }

  const imageRef = storageRef(storage, `recipes/${image.value.name}`)

  try {
    // Upload the file to the reference
    const uploadResult = await uploadBytes(imageRef, image.value)
    console.log('Uploaded a blob or file!')

    // Get the download URL
    const downloadURL = await getDownloadURL(uploadResult.ref)
    console.log('File available at', downloadURL)

    // Set the imageUrl in your recipe object
    recipe.value.image = downloadURL
    currentImageUrl.value = downloadURL
    uploadStatus.value = { message: 'Image uploaded successfully!', type: 'success' }
  } catch (error) {
    console.error('Error uploading file:', error)
    uploadStatus.value = { message: 'Error uploading image.', type: 'error' }
  }
}

const addRecipeToDatabase = async () => {
  const database = getDatabase();
  const recipesRef = dbRef(database, 'recipes');
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert('You must be logged in to add a recipe.');
    return;
  }

  const newRecipeData = {
      ...recipe.value,
      authorId: user.uid,
      timestamp: Date.now(),
    };

    try {
    const newRecipeRef = await push(recipesRef, newRecipeData)
    console.log('New recipe added with ID:', newRecipeRef.key)

    newRecipeData.id = newRecipeRef.key;
    await set(newRecipeRef, newRecipeData);

    await userService.addRecipeToUser(userId, newRecipeRef.key);
    router.push('/');
} catch (error) {
    console.error('Error adding recipe:', error)
}
}

const addRecipe = async () => {
  console.log('Adding Recipe')
  if (
    !recipe.value.title ||
    !recipe.value.ingredients.length ||
    !recipe.value.instructions ||
    !recipe.value.cookingTime
  ) {
    alert('Please complete all fields.')
    return
  }

  if (recipe.value.categories.length === 0) {
    alert('Please add at least one category.')
    return
  }

  // Ensure that an image has been uploaded
  if (!currentImageUrl.value) {
    alert('Please upload an image.')
    return
  }

  try {
    // Call the function to add the recipe to the database
    await addRecipeToDatabase()
      } catch (error) {
    console.error('Error submitting recipe: ', error)
  }
}

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

<template>
    <div class="container mx-auto px-4 py-6">
      <h1>Add New Recipe</h1>
      <form @submit.prevent="addRecipe">
        <!-- Add form fields for recipe details -->
        <input v-model="recipe.title" type="text" placeholder="Recipe Title" />
        <!-- More fields for ingredients, instructions, etc. -->
        <input type="file" @change="onImageChange">
        <button @click="uploadImage">Upload Image</button>
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
  
  // Define a ref to store the URL of the current image
  const currentImageUrl = ref('');
  
  const recipe = ref({
    title: '',
    // Other recipe properties
    imageUrl: '', // Add imageUrl to your recipe object
  });
  
  const image = ref(null);

const onImageChange = (event) => {
  image.value = event.target.files[0];
};

const uploadImage = async () => {
  if (!image.value) {
    alert("No image selected");
    return;
  }

  // Delete the old image if there is one
  if (currentImageUrl.value) {
    await deleteImage(currentImageUrl.value);
  }

  const storage = getStorage();
  const storageReference = storageRef(storage, 'recipes/' + new Date().getTime() + '-' + image.value.name);

  try {
    const snapshot = await uploadBytes(storageReference, image.value);
    const url = await getDownloadURL(snapshot.ref);
    console.log("Image URL:", url);
    recipe.value.imageUrl = url; // Save the URL to your recipe object
    currentImageUrl.value = url; // Update the current image URL
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
};

const deleteImage = async (imageUrl) => {
  const storage = getStorage();
  const imageRef = storageRef(storage, imageUrl);

  try {
    await deleteObject(imageRef);
    console.log("Old image deleted successfully");
  } catch (error) {
    console.error("Error deleting old image: ", error);
  }
};

</script>
  
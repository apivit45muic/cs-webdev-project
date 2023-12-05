<script setup>
import { ref, onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/js/firebase.js';
import { RouterLink, RouterView } from 'vue-router';
import { RocketLaunchIcon } from '@heroicons/vue/24/solid';
import router from '@/router/index.ts'

const user = ref(null);

onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });
});

import { signOut } from 'firebase/auth';

const logout = async () => {
  try {
    await signOut(auth);
    router.push('/');
  } catch (error) {
    console.error('Logout Failed', error);
  }
};

const goToAddRecipe = () => {
  router.push({ name: 'AddRecipe' });
};

const menuitems = ref([
    {id: 1, name: "Home" , link : "/"},
    {id: 2, name: "Recipes" , link : "/recipes"},
    {id: 3, name: "Category" , link : "/category"},
    {id: 3, name: "Planner" , link : "/planner"},
    {id: 4, name: "Manage Post" , link : "/managepost"},
    {id: 5, name: "Settings" , link : "/settings"},
])
</script>

<template>
<nav>
  <div class="bg-gray-900 text-gray-100 px-3 py-5 md:flex justify-between item-center">
    <!-- LOGO PART -->
    <div class="flex text-red-500 text-l">
      <RocketLaunchIcon class="h-6 w-6 text-blue-500 mr-2 md:mr-4 md:h-9 md:w-9" />
      <h1 class="text-l md:text-2xl">TEXTBOOK BAY</h1>
    </div>
    <!-- MENU PART-->
    <ul class="md:flex md:items-center">
      <li class="md:mx-4" v-for="menuitem in menuitems" v-bind:key="menuitem.id">
        <RouterLink :to="menuitem.link" class="hover:text-amber-400 md:text-xl">{{menuitem.name}}</RouterLink>
      </li>
    </ul>
    <div>
      <div v-if="user">
        Welcome, {{ user.email }}
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </div>
    </div>
  </div>
  <div v-if="user" @click="goToAddRecipe" class="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full cursor-pointer">
    <span>+</span> <!-- You can replace this with an icon -->
  </div>
</nav>

<RouterView />

</template>

<style>
/* Add styles for the floating action button */
.fixed.bottom-4.right-4 {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  
}
</style>
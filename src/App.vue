<script setup>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/js/firebase.js'
import { RouterLink, RouterView } from 'vue-router'
import { AcademicCapIcon } from '@heroicons/vue/24/outline'
import router from '@/router/index.ts'
import Footer from '@/components/Footer.vue'

const user = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
  })
})

import { signOut } from 'firebase/auth'

const logout = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Logout Failed', error)
  }
}

const goToAddRecipe = () => {
  router.push({ name: 'AddRecipe' })
}

const menuitems = ref([
  { id: 1, name: 'Home', link: '/' },
  { id: 2, name: 'Category', link: '/category' },
  { id: 3, name: 'Planner', link: '/planner' },
  { id: 4, name: 'Manage Post', link: '/manage-post' },
  { id: 5, name: 'Settings', link: '/settings' }
])
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <nav>
      <div class="bg-gray-800 text-gray-100 px-3 py-5 md:flex justify-between items-center">
        <!-- LOGO PART -->
        <div class="flex text-gray-100 text-l"> 
          <RouterLink to="/" class="flex items-center">
            <!-- Updated icon to AcademicCapIcon as an example -->
            <AcademicCapIcon class="h-6 w-6 mr-2 md:mr-4 md:h-9 md:w-9" />
            <h1 class="text-l md:text-2xl">Plan Palate</h1>
          </RouterLink>
        </div>

        <!-- MENU PART-->
        <ul class="md:flex md:items-center">
          <li class="md:mx-4" v-for="menuitem in menuitems" v-bind:key="menuitem.id">
            <RouterLink :to="menuitem.link" class="hover:text-amber-400 md:text-xl">{{
              menuitem.name
            }}</RouterLink>
          </li>
        </ul>
        <div class="flex items-center space-x-2">
          <div v-if="user" class="flex items-center space-x-4">
            <span>Welcome, {{ user.email }}</span>
            <button
              @click="logout"
              class="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 ml-2"
            >
              Logout
            </button>
          </div>
          <div v-else class="flex items-center space-x-1">
            <RouterLink to="/login" class="px-2 py-1 text-sm text-white rounded hover:bg-gray-700"
              >Login</RouterLink
            >
            <RouterLink
              to="/register"
              class="px-2 py-1 text-sm text-white rounded hover:bg-gray-700"
              >Register</RouterLink
            >
          </div>
        </div>
      </div>
    </nav>
    <RouterView class="flex-grow" />

    <button
      v-if="user && $route.name !== 'AddRecipe'"
      @click="goToAddRecipe"
      title="Add Recipe"
      class="fixed bottom-4 right-4 p-3 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>

    <Footer />
  </div>
</template>

<style>
/* Add styles for the floating action button */
.fixed.bottom-4.right-4 {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
}
</style>

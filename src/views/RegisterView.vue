<template>
<div class="min-h-screen-adjusted flex flex-wrap">
    <!-- Left Side - Image -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-blue-500 overflow-hidden">
      <img src="https://as1.ftcdn.net/v2/jpg/02/60/12/88/1000_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg" 
           alt="Register Image" 
           class="w-full h-full object-cover">
    </div>
  
      <!-- Right Side - Register Form -->
      <div class="w-full md:w-1/2 flex items-center justify-center">
        <div class="max-w-sm w-full p-6">
          <h1 class="text-3xl font-bold mb-2 text-left">Plan Palate</h1>
          <h2 class="text-xl font-semibold mb-4 text-left">Register</h2>
          <form @submit.prevent="register" class="text-left">
            <label class="block mb-2">Email Address</label>
            <input v-model="email" type="email" placeholder="Email" class="w-full px-3 py-2 mb-3 border rounded" />
  
            <label class="block mb-2">Password</label>
            <input v-model="password" type="password" placeholder="Password" class="w-full px-3 py-2 mb-3 border rounded" />
  
            <label class="block mb-2">Confirm Password</label>
            <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="w-full px-3 py-2 mb-3 border rounded" />
  
            <button type="submit" class="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">Register</button>
          </form>
          <p class="mt-4 text-left">
            Already have an account? 
            <router-link to="/login" class="text-blue-500 underline">Login here</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import userService from '@/services/userService.js';
  import { auth } from '@/js/firebase.js';
  import router from '@/router/index.ts';
  
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const register = async () => {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email.value, password.value);
  
    await userService.createUserOnDatabase(user);

    router.push('/');
  };
  </script>
  
  <style>
  .min-h-screen-adjusted {
    min-height: calc(100vh - 60px); /* Adjust based on your navbar's height */
  }
  </style>
  
<!-- <template>
    <div class="container mx-auto px-4 py-6">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '@/js/firebase.js';
  import router from '@/router/index.ts'
  
  const email = ref('');
  const password = ref('');
  
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      router.push('/')
    } catch (error) {
      alert(error.message);
    }
  };
  </script>
   -->
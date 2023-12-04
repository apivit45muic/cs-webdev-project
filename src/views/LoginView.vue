<template>
    <div class="min-h-screen-adjusted flex flex-wrap">
    <!-- Left Side - Image -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-blue-500 overflow-hidden">
      <img src="https://as1.ftcdn.net/v2/jpg/02/52/38/80/1000_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg" 
           alt="Login Image" 
           class="w-full h-full object-cover">
    </div>
  
      <!-- Right Side - Login Form -->
      <div class="w-full md:w-1/2 flex items-center justify-center">
        <div class="max-w-sm w-full p-6">
          <h1 class="text-3xl font-bold mb-2 text-left">Plan Palate</h1>
          <h2 class="text-xl font-semibold mb-4 text-left">Login</h2>
          <form @submit.prevent="login" class="text-left">
            <label class="block mb-2">Email Address</label>
            <input v-model="email" type="email" placeholder="Email" class="w-full px-3 py-2 mb-3 border rounded" />
  
            <label class="block mb-2">Password</label>
            <input v-model="password" type="password" placeholder="Password" class="w-full px-3 py-2 mb-3 border rounded" />
  
            <button type="submit" class="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">Login</button>
          </form>
          <button @click="sendResetEmail" class="text-blue-500 underline mt-2">Forgot Password?</button>
          <p class="mt-4 text-left">
            Don't have an account? 
            <router-link to="/register" class="text-blue-500 underline">Register here</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { signInWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth';
  import { auth } from '@/js/firebase.js';
  import router from '@/router/index.ts'
  
  const email = ref('');
  const password = ref('');
  
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      router.push('/')
    } catch (error) {
      alert(error.message);
    }
  };

  const sendResetEmail = async () => {
  if (!email.value) {
    alert("Please enter your email address.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email.value);
    alert("Password reset email sent. Please check your inbox.");
  } catch (error) {
    alert(error.message);
  }
};

  </script>
  
  
  <style>
  .min-h-screen-adjusted {
  /* Adjust this value based on your actual navbar's height */
  min-height: calc(100vh - 60px);
}
  </style>
  
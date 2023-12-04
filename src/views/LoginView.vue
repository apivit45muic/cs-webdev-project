<template>
    <div class="container mx-auto px-4 py-6">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { signInWithEmailAndPassword } from 'firebase/auth';
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
  </script>
  
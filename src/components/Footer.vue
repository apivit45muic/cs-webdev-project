<template>
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-between">
          <!-- Branding Column -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold mb-2">Plan Palate</h2>
            <p class="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p class="text-gray-400 mt-4">&copy; {{ currentYear }} Plan Palate. All rights reserved.</p>
          </div>
  
          <div class="mb-6">
            <h3 class="text-xl font-semibold mb-2">SUPPORT</h3>
            <ul>
              <li><a href="#" class="text-gray-400 hover:text-white">Help</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Give feedback</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Report a bug</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Manage cookie settings</a></li>
            </ul>
          </div>
  
          <div class="mb-6">
            <h3 class="text-xl font-semibold mb-2">COMMUNITY</h3>
            <ul>
                <li><a href="#" class="text-gray-400 hover:text-white">Support authors</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Contact us</a></li>
            </ul>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-semibold mb-2">CREATORS</h3>
            Apiwit Chonkitgosol 6280561
            <br/>
            Lorenzo Cassio 6280924
          </div>

        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const currentYear = ref(new Date().getFullYear());
  </script>
  
  <style scoped>
  /* You can add additional styling here if needed */
  </style>
  
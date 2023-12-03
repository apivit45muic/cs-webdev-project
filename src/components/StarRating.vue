<template>
    <div class="star-rating flex">
      <div v-for="star in [1, 2, 3, 4, 5]" :key="star" class="relative">
        <StarOutlineIcon class="w-5 h-5 text-gray-400" />
        <div 
          class="absolute top-0 left-0 overflow-hidden" 
          :style="{ width: getStarFillWidth(star, rating) }">
          <StarSolidIcon class="w-5 h-5 text-yellow-400" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid';
  import { StarIcon as StarOutlineIcon } from '@heroicons/vue/24/outline';
  
  const props = defineProps({
    rating: {
      type: Number,
      required: true
    }
  });
  
  const getStarFillWidth = (star, rating) => {
    const starPercentage = (rating - star + 1) * 100;
    return `${Math.min(Math.max(starPercentage, 0), 100)}%`;
  };
  </script>
  
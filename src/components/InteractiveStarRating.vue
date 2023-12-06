<template>
    <div class="star-rating flex justify-center">
      <div 
        v-for="star in [1, 2, 3, 4, 5]" 
        :key="star" 
        class="relative cursor-pointer"
        @click="setRating(star)"
        @mouseover="tempRating = star"
        @mouseleave="tempRating = userRating"
      >
        <StarOutlineIcon class="w-8 h-8 text-gray-400" />
        <div 
          class="absolute top-0 left-0 overflow-hidden" 
          :style="{ width: getStarFillWidth(star) }"
        >
          <StarSolidIcon class="w-8 h-8 text-yellow-400" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid';
  import { StarIcon as StarOutlineIcon } from '@heroicons/vue/24/outline';
  
  const userRating = ref(0);
  const tempRating = ref(0);
  
  const setRating = (newRating) => {
    userRating.value = newRating;
    emit('update-rating', newRating);
  };
  
  const getStarFillWidth = (star) => {
    const rating = tempRating.value || userRating.value;
    const starPercentage = (rating - star + 1) * 100;
    return `${Math.min(Math.max(starPercentage, 0), 100)}%`;
  };
  </script>
  
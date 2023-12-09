<template>
    <div class="star-rating flex justify-center">
      <div 
        v-for="star in [1, 2, 3, 4, 5]" 
        :key="star" 
        class="relative cursor-pointer"
        @click="handleClick(star)"
        @mouseover="handleMouseOver(star)"
        @mouseleave="handleMouseLeave"
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
  import { ref, computed, watch } from 'vue';
  import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid';
  import { StarIcon as StarOutlineIcon } from '@heroicons/vue/24/outline';
  
  const props = defineProps({
  initialRating: {
    type: Number,
    default: 0
  },
  userRating: Number,
  isInteractive: Boolean,
  isAuthenticated: Boolean 
});

  const emit = defineEmits(['update-rating']);
  
  const displayRating = ref(props.initialRating);
  const tempRating = ref(0);
  
  watch(() => props.userRating, (newVal) => {
    displayRating.value = newVal || props.initialRating;
  });
  
  const handleClick = (newRating) => {
  if (props.isInteractive && props.isAuthenticated) {
    emit('update-rating', newRating);
  } else {
    // Emit an event to notify parent component
    emit('auth-required');
  }
};
  
  const handleMouseOver = (star) => {
    if (props.isInteractive) {
      tempRating.value = star;
    }
  };
  
  const handleMouseLeave = () => {
    tempRating.value = 0;
  };
  
  const getStarFillWidth = (star) => {
    const rating = tempRating.value || displayRating.value;
    const starPercentage = (rating - star + 1) * 100;
    return `${Math.min(Math.max(starPercentage, 0), 100)}%`;
  };
  </script>
  
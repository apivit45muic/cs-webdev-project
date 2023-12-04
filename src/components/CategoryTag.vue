<template>
  <span 
    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
    @click="onCategoryClick(category)">
    #{{ category }}
  </span>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

const router = useRouter();

const onCategoryClick = (category) => {
  router.push({ name: 'CategoryView', params: { category } });
};
</script>

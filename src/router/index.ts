import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeView from '../views/RecipeView.vue'
import CategoryView from '../views/CategoryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/category/:category', // Route for category view
      name: 'CategoryView',
      component: CategoryView,
      props: true
    },
    {
      path: '/recipe/:id', // Add this new route
      name: 'RecipeView',
      component: RecipeView,
    }
  ]
})

export default router;

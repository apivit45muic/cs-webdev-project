import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeView from '../views/RecipeView.vue'
import CategoryView from '../views/CategoryView.vue';
import CategoriesView from '../views/CategoriesView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import AddRecipeView from '../views/AddRecipeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/register', name: 'Register', component: RegisterView },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/category',
      name: 'CategoriesView',
      component: CategoriesView
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
    },
    { 
      path: '/add-recipe', 
      name: 'AddRecipe', 
      component: AddRecipeView 
    }
  ]
})

export default router;

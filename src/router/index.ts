import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeView from '../views/HomeView.vue'
import RecipeView from '../views/RecipeView.vue'
import CategoryView from '../views/CategoryView.vue';
import CategoriesView from '../views/CategoriesView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import AddRecipeView from '../views/AddRecipeView.vue';
import SettingsView from '../views/SettingsView.vue';
import ManagePostView from '../views/ManagePostView.vue';


const routes = [
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
      component: () => import('../views/AddRecipeView.vue'),
      meta: { requiresAuth: true } // Add this line
    },
    {
      path: '/manage-post',
      name: 'ManagePost',
      component: ManagePostView,
      meta: { requiresAuth: true }
    }
    ,
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsView,
      meta: { requiresAuth: true }
    }
  ];
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = getAuth().currentUser;
  
    if (requiresAuth && !isAuthenticated) {
      next('/'); // Redirect to home if not authenticated
    } else {
      next(); // Proceed as normal if authenticated or no auth required
    }
  });
  
  export default router;

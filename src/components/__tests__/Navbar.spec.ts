import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: { template: '<div>Home</div>' } },
  { path: '/category', component: { template: '<div>Category</div>' } },
  { path: '/planner', component: { template: '<div>Planner</div>' } },
  { path: '/manage-post', component: { template: '<div>Manage Post</div>' } },
  { path: '/settings', component: { template: '<div>Settings</div>' } },
  { path: '/login', component: { template: '<div>Login</div>' } },
  { path: '/register', component: { template: '<div>Register</div>' } },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('App.vue', () => {
  it('renders navbar and footer', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await router.isReady();

    expect(wrapper.find('nav').exists()).toBe(true);
    expect(wrapper.find('footer').exists()).toBe(true);
  });
});

describe('App.vue Navigation', () => {
    const navbarLinks = [
      { text: 'Home', path: '/' },
      { text: 'Category', path: '/category' },
      { text: 'Planner', path: '/planner' },
      { text: 'Manage Post', path: '/manage-post' },
      { text: 'Settings', path: '/settings' },
      { text: 'Login', path: '/login' },
      { text: 'Register', path: '/register' },
    ];
  
    navbarLinks.forEach(navLink => {
      it(`navigates to ${navLink.path} when ${navLink.text} is clicked`, async () => {
        const wrapper = mount(App, {
          global: {
            plugins: [router],
          },
        });
  
        await router.isReady();
        await router.push(navLink.path);
        await wrapper.vm.$nextTick(); 
  
        expect(router.currentRoute.value.fullPath).toBe(navLink.path);
      });
    });
  
  });

import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import Dashboard from '@/views/DashboardView.vue';
import Login from '@/views/LoginView.vue';

const isAuthenticated = (): boolean => !!localStorage.getItem('access_token');

const routes = [
  { path: '/', component: Login },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      if (!isAuthenticated()) {
        next('/');
      } else {
        next();
      }
    },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

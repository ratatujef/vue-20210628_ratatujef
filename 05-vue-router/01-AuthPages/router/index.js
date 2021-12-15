import { createRouter, createWebHistory } from 'vue-router';
export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
    { path: '/', name: 'homePage', component: () => import('../views/PageIndex') },
    { path: '/login', name: 'loginPage', component: () => import('../views/PageLogin') },
    { path: '/register', name: 'registerPage', component: () => import('../views/PageRegister') },
  ],
});

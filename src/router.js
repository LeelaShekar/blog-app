import { createRouter, createWebHistory } from 'vue-router';
import noteWrapper from './components/noteWrapper.vue'
import viewNote from './components/viewNote.vue';
import loginForm from './components/loginForm.vue';

const routes = [
    {
      path: '/',
      name: 'loginForm',
      component: loginForm
    },
    {
      path: '/create',
      name: 'noteWrapper',
      component: noteWrapper
    },
    {
        path: '/view',
        name: 'viewNote',
        component: viewNote
      },
     
  ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  });
  
  export default router;
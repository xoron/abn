import { createApp } from "vue";
import './index.css';
import { createRouter, createWebHashHistory } from 'vue-router';
// import VueSnap from 'vue-snap'
import AppVue from './App.vue';

const routes = [
  { path: '/', component: AppVue },
  { path: '/about', component: AppVue },
  { path: '/app/:test', component: AppVue },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(AppVue);
app.use(router);
// app.use(VueSnap);
app.mount('#app'); 

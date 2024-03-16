import { createApp } from "vue";
import './index.css';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import { createRouter, createWebHashHistory } from 'vue-router';
import AppVue from './organisms/app/App.vue';
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import Toolbar from "primevue/toolbar"
import InputIcon from "primevue/inputicon"
import InputText from "primevue/inputtext"
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';

export const routes = [
  { path: '/', component: AppVue },
  { path: '/genres', component: AppVue },
  { path: '/ratings', component: AppVue },
  { path: '/show/:id', component: AppVue },
  { path: '/search/:query', component: AppVue },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(AppVue);
app.use(router);
app.use(PrimeVue);
app.component('Button', Button);
app.component('Toolbar', Toolbar);
app.component('Dialog', Dialog);
app.component('InputIcon', InputIcon);
app.component('InputText', InputText);
app.component('Carousel', Carousel);
app.component('Tag', Tag);

app.mount('#app'); 

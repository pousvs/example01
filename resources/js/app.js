import './bootstrap';

import { createApp } from 'vue';
import App from './App.vue';
import menu from './components/menusildebar.vue';
import router from './router';

import { createPinia } from 'pinia';
const pinia = createPinia();


const app = createApp(App)
app.component('menusildebar', menu)
app.use(router)
app.use(pinia)
app.mount('#app-vue');
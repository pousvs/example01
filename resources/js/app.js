import './bootstrap';

import { createApp } from 'vue';
import App from './App.vue';
import menu from './components/menusildebar.vue';
import router from './router';
import Pagination from './components/Pagination.vue';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createPinia } from 'pinia';
const pinia = createPinia();


const app = createApp(App)
app.use(VueSweetalert2)
app.component('menusildebar', menu)
app.component('Pagination',Pagination)
app.use(router)
app.use(pinia)
app.mount('#app-vue');
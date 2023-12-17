import './bootstrap';

import { createApp } from 'vue';
import App from './App.vue';
import menu from './components/menusildebar.vue';
import router from './router';

const app = createApp(App)
app.component('menusildebar', menu)
app.use(router)
app.mount('#app-vue');
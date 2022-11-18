import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
//import { router } from './router';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

const app = createApp(App).use(router);

app.use(createPinia());
//app.use(router);

app.mount('#app');

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'

const sweetAlertOptions = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};

import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const pinia = createPinia();

pinia.use(piniaPluginPersistedState)


const app = createApp(App)

app.use(pinia)
app.use(router)

app.use(VueSweetalert2, sweetAlertOptions);

app.mount('#app')

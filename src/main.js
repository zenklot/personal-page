import "bootstrap/dist/css/bootstrap.css";
import 'vue-loading-overlay/dist/vue-loading.css';
import "./assets/css/style.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { komentar } from './store/komentar.js'
import { createStore } from 'vuex'
const store = createStore({
	modules: {
        komentar
	}
});

import VueLoading from 'vue-loading-overlay';

import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'https://my-json-server.typicode.com/zenklot/db-komentar';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

createApp(App).use(store).use(router).use(VueAxios, axios).use(VueSweetalert2).use(BootstrapIconsPlugin).use(VueLoading).mount('#app')
import "bootstrap/dist/js/bootstrap.js";
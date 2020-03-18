import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { createRouter } from './router';
import pluginCore from './plugins/core';
import './assets/css/common.css';
import './assets/css/theme/index.css';
import _ from 'lodash';

Vue.config.productionTip = false;

Vue.use(pluginCore);
window.Vue = Vue;

const router = createRouter();

Vue.$router = router;

new Vue({
    store,
    router,
    render: (h) => h(App)
}).$mount('#app');

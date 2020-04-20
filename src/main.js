import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import store from './store';
import { createRouter } from './router';
import pluginCore from './plugins/core';
import api from './services';
import './assets/css/common.css';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/style.css';
import _ from 'lodash';

Vue.config.productionTip = false;
Vue.prototype.$api = api;

Vue.use(pluginCore);
Vue.use(VueI18n);
window.Vue = Vue;

const router = createRouter();

Vue.$router = router;

const i18n = new VueI18n({
    locale: 'zh', // 定义默认语言为中文
    messages: {
        zh: require('@/assets/languages/zh.json'),
        en: require('@/assets/languages/en.json')
    }
});

new Vue({
    store,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');

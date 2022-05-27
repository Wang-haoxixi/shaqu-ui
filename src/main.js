import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api/index'
import permission from './directive/permission/'
import echarts from 'echarts'
import Print from 'vue-print-nb'
import moment from 'moment'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
Vue.use(Print);

Vue.prototype.$echarts = echarts
Vue.use(ElementUI, {size: 'small'});

Vue.use(permission);


Vue.config.productionTip = false

// 将各模块 sdk 挂载在 vue 实例上
Vue.prototype.$api = api;
Vue.prototype.$moment = moment;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

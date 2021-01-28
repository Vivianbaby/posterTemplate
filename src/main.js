import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import './permission'

import './utils/prototype'

Vue.config.productionTip = false
Vue.prototype.$uploadApi = "/api/file/upload";

Vue.use(ElementUI);
new Vue({
  render: h => h(App),
    router,
    store,
}).$mount('#app')

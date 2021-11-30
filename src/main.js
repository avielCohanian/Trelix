import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Element from 'element-ui';
import VueDragDrop from 'vue-drag-drop';
import 'element-ui/lib/theme-chalk/index.css';
<<<<<<< HEAD

=======
>>>>>>> a2b497d27e126b527ecccb26fa66905964faeba4

Vue.use(Element);
Vue.use(VueDragDrop);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    el: '#app',
    render: (h) => h(App),
}).$mount('#app');

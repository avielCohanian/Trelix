import Vue from 'vue';
import App from './App.vue';
import './assets/style/styles.scss';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Element from 'element-ui';
import VueDragDrop from 'vue-drag-drop';
import { socketService } from './service/socket.service.js';

import 'element-ui/lib/theme-chalk/index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTasks, faPlus, faTimes, faSearch, faUsers, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

socketService.setup();
library.add(faTasks, faPlus, faTimes, faSearch, faUsers, faCheck);
library.add(faTrello);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Element);
Vue.use(VueDragDrop);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  el: '#app',
  render: (h) => h(App),
}).$mount('#app');

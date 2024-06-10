import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import Buefy from 'buefy';

import "./../node_modules/bulma/css/bulma.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faShoppingCart, faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(faShoppingCart);
library.add(faPlus);
library.add(faEdit);
library.add(faTrash);

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(Buefy);

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    this.$store.dispatch('loadCartFromLocalStorage');
  },
}).$mount("#app");

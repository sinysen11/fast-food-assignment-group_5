import Vuex from "vuex";
import Vue from "vue";
import Products from "./modules/products";
import Cart from "./modules/cart";
import Coupons from "./modules/coupons";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products: Products,
    cart: Cart,
    coupons: Coupons,
  },
});

import Vuex from "vuex";
import Vue from "vue";
import Products from "./modules/products";
import Cart from "./modules/cart";
import Coupons from "./modules/coupons";

Vue.use(Vuex);

export default new Vuex.Store({
  
  state: {
    cartItems: [],
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  getters: {
    getCartItemsCount: (state) => state.cartItems.length,
    getCartItems: (state) => state.cartItems,
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.user,
    userRole: (state) => state.user?.role || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    addToCart(state, item) {
      state.cartItems.push(item);
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      let role = 'user';
      if (username === 'admin') {
        role = 'admin';
      }
      if ((username === 'admin' || username === 'user') && password === '123456') {
        const user = { username, role };
        localStorage.setItem('user', JSON.stringify(user));
        commit('setUser', user);
      } else {
        alert("Incorrect username or password");
      }
    },
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('clearUser');
    },
    addToCart({ commit }, item) {
      commit('addToCart', item);
    }
  },
  modules: {
    products: Products,
    cart: Cart,
    coupons: Coupons,
  },
});

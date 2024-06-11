import Vuex from "vuex";
import Vue from "vue";
import Products from "./modules/products";
import Cart from "./modules/cart";
import Coupons from "./modules/coupons";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    cartItems: [],
    user: JSON.parse(localStorage.getItem('activeUser')) || null,
  },
  getters: {
    getCartItemsCount: (state) => state.cartItems.length,
    getCartItems: (state) => state.cartItems,
    getCartTotal: (state) => state.cartItems.reduce((total, item) => total + (item.price * item.qty), 0),
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
      localStorage.setItem('addToCart', JSON.stringify(state.cartItems));
    },
    setCartItems(state, items) {
      state.cartItems = items;
    },
    removeCartItem(state, itemID) {
      state.cartItems = state.cartItems.filter(item => item.id !== itemID);
      localStorage.setItem('addToCart', JSON.stringify(state.cartItems));
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
    },
    setCartItems({ commit }, items) {
      commit('setCartItems', items);
    },
    removeCartItem({ commit }, itemID) {
      commit('removeCartItem', itemID);
    },
    loadCartFromLocalStorage({ commit }) {
      const storedCartItems = localStorage.getItem('addToCart');
      if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems);
        commit('setCartItems', cartItems);
      }
    }
  },
  modules: {
    products: Products,
    cart: Cart,
    coupons: Coupons,
  },
  created() {
    this.dispatch('loadCartFromLocalStorage');
  }
});

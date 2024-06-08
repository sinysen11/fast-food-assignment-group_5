import products from "./products";

const state = {
  cartItemsCount: 0,
  cartItems: [],
};

const getters = {
  getCartItemsCount(state) {
    return state.cartItems.length;
  },
  getCartItems(state) {
    return state.cartItems;
  },
};

const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product);
  },
};

const mutations = {
  ADD_TO_CART(state, product) {
    state.cartItems.push(product);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  products
};

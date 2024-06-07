import api from "./../../api/products";

const state = {
  products: null,
  product: null,
  categoryProducts: null,
};

const getters = {
  allProducts(state) {
    return state.products;
  },
  singleProduct(state) {
    return state.product;
  },
  categoryProducts(state) {
    return state.categoryProducts;
  },
};

const actions = {
  async fetchProductsFromApi({ commit }) {
    const products = await api.fetchProducts();
    commit("setProductsState", products.data);
  },
  async fetchCategoryProducts({ commit }, payload) {
    commit("setCategoryProducts", null);
    const products = await api.fetchProductsByCategory(payload.category);

    const itemIndex = products.data.findIndex((item) => {
      return item.id === payload.currentProductId;
    });
    products.data.splice(itemIndex, 1);
    commit("setCategoryProducts", products.data);
  },
  async fetchProductFromApi({ commit }, product_id) {
    commit("setProductState", null);
    const product = await api.fetchProduct(product_id);
    commit("setProductState", product.data);
  },
};

const mutations = {
  setProductsState(state, products) {
    state.products = products;
  },
  setCategoryProducts(state, products) {
    state.categoryProducts = products;
  },
  setProductState(state, product) {
    state.product = product;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};

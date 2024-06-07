import api from "./../../api/products";

const state = {
  cartItemsCount: 0,
  cartItems: {
    items: [],
    has_coupon: false,
    coupon_discount: 0,
  },
  cartTotal: null,
};

const getters = {
  getCartItemsCount(state) {
    const count = state.cartItems.items.length;
    return (state.cartItemsCount = count);
  },
  getCartItems(state) {
    return state.cartItems.items;
  },
  getCartTotal(state) {
    if (state.cartItems.items.length > 1) {
      const prices = state.cartItems.items.map((item) => item.price);
      const total = prices.reduce((previous, price) => {
        return previous + price;
      }, 0);
      return (state.cartTotal = total.toFixed(2));
    }

    return (state.cartTotal = state.cartItems.items[0].price);
  },
  getCartSubTotal(state) {
    if (state.cartItems.has_coupon) {
      const total = state.cartTotal;
      const discount = state.cartItems.coupon_discount;
      const discounted = (discount / 100) * total;
      const subtotal = total - discounted;
      return parseFloat(subtotal).toFixed(2);
    }

    return state.cartTotal;
  },
  cartHasCoupon(state) {
    return state.cartItems.has_coupon;
  },
};

const actions = {
  async addToCart({ commit, state }, cart_data) {
    document.querySelector(".add-to-cart-btn").classList.add("is-loading");
    const { qty, id } = cart_data;
    let currentItems = [...state.cartItems.items];

    const itemIndex = api.getIndexFor(currentItems, id);

    const product = await api.fetchProduct(id);

    if (itemIndex >= 0) {
      commit("updateCartQty", { itemIndex, qty, product: product.data });
    } else {
      commit("addToCart", { cart_data, product: product.data });
    }
  },
  removeCartItem({ commit, state }, payload) {
    const itemIndex = api.getIndexFor(state.cartItems.items, payload.itemID);

    commit("updateCartRemoveItem", itemIndex);
  },
};

const mutations = {
  addToCart(state, payload) {
    const { id, qty } = payload.cart_data;
    const product = payload.product;
    const price = parseFloat(qty) * parseFloat(product.price);
    state.cartItems.items.push({
      id,
      qty,
      price,
      product,
    });
    document.querySelector(".add-to-cart-btn").classList.remove("is-loading");
  },
  updateCartQty(state, payload) {
    state.cartItems.items[payload.itemIndex].qty = parseInt(payload.qty);
    const price = parseFloat(payload.qty) * parseFloat(payload.product.price);
    state.cartItems.items[payload.itemIndex].price = price;
    document.querySelector(".add-to-cart-btn").classList.remove("is-loading");
  },
  updateCartRemoveItem(state, itemIndex) {
    state.cartItems.items.splice(itemIndex, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

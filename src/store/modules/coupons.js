const state = {
  coupons: [
    {
      code: "VSC10",
      discount: 10,
      css_class: "is-info",
    },
    {
      code: "VSC20",
      discount: 20,
      css_class: "is-success",
    },
    {
      code: "VSC50",
      discount: 50,
      css_class: "is-danger",
    },
    {
      code: "VSC80",
      discount: 80,
      css_class: "is-primary",
    },
  ],
  has_coupon: true,
  selected_coupon: "",
};

const getters = {
  hasCoupon(state) {
    return state.has_coupon;
  },
};

const actions = {
  applyCouponToCart({ state, rootState }, coupon) {
    const couponIndex = state.coupons.findIndex((item) => {
      return item.code === coupon;
    });
    if (couponIndex >= 0) {
      const { code, discount } = state.coupons[couponIndex];
      state.has_coupon = true;
      state.selected_coupon = code;
      rootState.cart.cartItems.has_coupon = true;
      document.getElementById("coupon-btn").classList.add("is-disabled");
      document.querySelector(".coupon-input").setAttribute("disabled", true);
      rootState.cart.cartItems.coupon_discount = parseInt(discount);
    } else {
      state.has_coupon = false;
    }
  },
};

export default {
  state,
  getters,
  actions,
};

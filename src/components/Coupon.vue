<template>
  <div class="columns is-multiline">
    <div class="column is-offset-9 is-3">
      <div class="field is-grouped coupon-form">
        <p class="control is-expanded">
          <input
            class="input coupon-input"
            type="text"
            v-model="coupon"
            placeholder="enter a coupon code"
          />
        </p>
        <p class="control">
          <a id="coupon-btn" class="button is-info" @click.prevent="applyCoupon">Apply</a>
        </p>
      </div>
      <p class="has-text-danger has-text-right" v-if="!hasCoupon">Coupon not found or expired.</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Coupon",
  props: ["cart_items"],
  data() {
    return {
      coupon: this.$store.state.coupons.selected_coupon,
      error: false
    };
  },
  computed: {
    ...mapGetters(["hasCoupon", "cartHasCoupon"])
  },
  mounted() {
    if (this.cartHasCoupon) {
      document.querySelector(".coupon-input").setAttribute("disabled", true);
    }
  },
  methods: {
    ...mapActions(["applyCouponToCart"]),
    applyCoupon() {
      if (!this.$store.state.cart.cartItems.has_coupon) {
        this.applyCouponToCart(this.coupon);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 767px) {
  .coupon-form {
    padding: 0 15px;
  }
}
</style>
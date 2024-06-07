<template>
  <div class="cart" v-if="getCartItems.length > 0">
    <table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr>
          <th>Sr No.</th>
          <th>Product ID</th>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart, key) in getCartItems" :key="cart.id">
          <td>{{ key + 1 }}</td>
          <td>{{ cart.id }}</td>
          <td>
            <figure class="image is-32x32">
              <img :src="cart.product.image" alt="Image" />
            </figure>
          </td>
          <td>
            <router-link :to="{ name: 'product', params: { id: cart.id } }">{{ cart.product.title }}</router-link>
          </td>
          <td>${{ cart.product.price }}</td>
          <td>{{ cart.qty }}</td>
          <td>${{ cart.price }}</td>
          <td>
            <a
              class="button is-danger mr-3"
              href="#"
              @click.prevent="removeItem(cart.id)"
              title
            >Remove</a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="cart-meta has-text-right is-size-5 mb-4">
      <p>Total: ${{ getCartTotal }}</p>
    </div>
    <coupon :cart_items="getCartItems" />
    <div class="cart-meta has-text-right is-size-5 mb-4">
      <p class="mb-4">Sub Total: ${{ getCartSubTotal }}</p>
      <p>
        <a class="button is-success is-large">Checkout</a>
      </p>
    </div>
  </div>
  <div v-else class="cart">
    You cart is empty.
    <router-link to="/">Start Shopping</router-link>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Coupon from "./Coupon";
export default {
  name: "Cart",
  components: {
    Coupon
  },
  computed: {
    ...mapGetters(["getCartItems", "getCartTotal", "getCartSubTotal"])
  },
  methods: {
    ...mapActions(["removeCartItem"]),
    removeItem(id) {
      this.removeCartItem({ itemID: id });
    }
  }
};
</script>
<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.cart {
  margin-top: 3rem;
}
@media screen and (max-width: 767px) {
  .cart-meta {
    padding: 0 15px;
  }
}
</style>
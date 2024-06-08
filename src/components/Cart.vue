<template>
  <div class="cart">
    <table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Image</th>
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
              <img alt="Image" />
            </figure>
          </td>
          <td>
            <router-link :to="{ name: 'product', params: { id: cart.id } }">{{ "fdafdsa" }}</router-link>
          </td>
          <td>${{ "3" }}</td>
          <td>{{ cart.qty }}</td>
          <td>${{ cart.price }}</td>
          <td>
            <a
              class="button is-danger mr-3"
              href="#"
              @click.prevent="removeItem(cart.id)"
              
            >Remove</a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="cart-meta has-text-right is-size-5 mb-4">
      <p>Total: ${{ "0" }}</p>
    </div>
    <!-- <coupon :cart_items="getCartItems" /> -->
    <div class="cart-meta has-text-right is-size-5 mb-4">
      <p class="mb-4">Sub Total: ${{ "0" }}</p>
      <p>
        <a class="button is-success is-large">Checkout</a>
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import Coupon from "./Coupon";
export default {
  name: "Cart",
  components: {
    // Coupon
  },
  computed: {
    ...mapGetters(['getCartItems', 'getCartTotal', 'getCartSubTotal'])

  },
  created() {
    this.fetchProductsFromLocalStorage()
  },
  methods: {
    removeItem(id) {
      this.removeCartItem({ itemID: id });
    },
    fetchProductsFromLocalStorage() {
      const getCartItems = localStorage.getItem('products');
      return getCartItems
    },
  },
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
  margin-top: 100px;
}
@media screen and (max-width: 767px) {
  .cart-meta {
    padding: 0 15px;
  }
}
</style>
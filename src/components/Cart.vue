<template>
  <div class="cart">
    <table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart, index) in getCartItems" :key="index">
          <td>{{ cart.id }}</td>
          <td>{{ cart.name }}</td>
          <td>
            <figure class="image is-32x32">
              <img :src="cart.image" alt="Product Image" />
            </figure>
          </td>
          <td>${{ cart.price }}</td>
          <td>{{ cart.qty }}</td>
          <td>${{ cart.price * cart.qty }}</td>
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
      <p>Total: ${{ getCartTotal }}</p>
    </div>
    <div class="cart-meta has-text-right is-size-5 mb-4">
      <p class="mb-4">Sub Total: ${{ getCartSubTotal }}</p>
      <p>
        <a class="button is-success is-large">Checkout</a>
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
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
      const getCartItems = localStorage.getItem('addToCart');
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
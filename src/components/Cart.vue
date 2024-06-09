<template>
  <div class="cart">
    <table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart, index) in getCartItems" :key="index">
          <td>{{ cart.name }}</td>
          <td>
            <figure class="image">
              <img :src="cart.image" alt="Product Image" />
            </figure>
          </td>
          <td>${{ cart.price * 1 }}</td>
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
    <div class="cart-meta has-text-right is-size-5 mb-4" v-if="getCartItems.length > 0">
      <p>Total: ${{ getCartTotal }}</p>
    </div>
    <div class="cart-meta has-text-right is-size-5 mb-4" v-if="getCartItems.length > 0">
      <p>
        <a class="button is-success" @click="showPaymentModal = true">Order Now</a>
      </p>
    </div>

    <b-modal :active.sync="showPaymentModal" :width="640" scroll="keep">
      <div class="box">
        <h1 class="title">Payment</h1>
        <p>Total Amount: ${{ getCartTotal }}</p>
        <b-field label="Card Number">
          <b-input placeholder="Enter your Visa card number"></b-input>
        </b-field>
        <b-field label="Expiry Date">
          <b-input type="month" placeholder="MM/YY"></b-input>
        </b-field>
        <b-field label="CVV">
          <b-input type="password" placeholder="CVV"></b-input>
        </b-field>
        <div class="has-text-right">
          <b-button type="is-primary" @click="processPayment">Pay Now</b-button>
        </div>
      </div>
    </b-modal>
    <div class="empty-logo" v-if="getCartItems.length === 0">
      <img :src="emptyProductImage" class="" alt="Empty Product">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import emptyProductImage from '@/assets/empty-cart.png';

export default {
  name: "Cart",
  data() {
    return {
      showPaymentModal: false,
      emptyProductImage
    };
  },
  computed: {
    ...mapGetters(['getCartItems', 'getCartTotal'])
  },
  created() {
    this.loadCartFromLocalStorage();
  },
  methods: {
    ...mapActions(['removeCartItem', 'setCartItems']),
    removeItem(id) {
      this.removeCartItem(id);
    },
    loadCartFromLocalStorage() {
      const storedCartItems = localStorage.getItem('addToCart');
      if (storedCartItems) {
        const cartItems = JSON.parse(storedCartItems);
        this.setCartItems(cartItems);
      }
    },
    processPayment() {
      // Process the payment
      alert(`Payment of $${this.getCartTotal} processed!`);

      // Create a new history entry
      const cartItems = this.getCartItems;
      const totalPrice = this.getCartTotal;// 
      const orderDate = new Date().toLocaleString();
      const historyItem = {
        names: cartItems.map(item => item.name).join(', '),
        total: totalPrice,
        image: cartItems.length > 0 ? cartItems[0].image : '',
        date: orderDate,
      };

      let history = localStorage.getItem('history');
      history = history ? JSON.parse(history) : [];

      history.push(historyItem);

      localStorage.setItem('history', JSON.stringify(history));

      localStorage.removeItem('addToCart');
      this.setCartItems([]);

      this.showPaymentModal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.image img {
  width: 16%;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
.cart {
  margin-top: 100px;
}
.empty-logo {
  display: flex;
  justify-content: center;

  img {
    max-width: 30%;
  }
}
@media screen and (max-width: 767px) {
  .cart-meta {
    padding: 0 15px;
  }
}
</style>

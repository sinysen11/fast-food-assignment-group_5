<template>
  <div id="nav">
    <div class="columns is-multiline">
      <div class="column is-half">
        <div class="is-pulled-left mr-4 logo">
          <img class="image is-32x32" alt="Vue logo" src="../assets/logo.png" />
        </div>
        <div class="is-pulled-left nav-links">
          <router-link class="mr-4" to="/">Products</router-link>
        </div>
      </div>
      <div class="column is-half">
        <div class="has-text-right cart-view">
          <router-link to="/cart">View Cart ({{ getCartItemsCount }} items)</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Navigation",
  computed: {
    ...mapGetters(["getCartItemsCount", "getCartItems"])
  }
};
</script>
<style lang="scss" scoped>
#nav {
  margin-top: 2rem;
}
@media screen and (max-width: 767px) {
  #nav {
    padding: 0 30px;
    .logo,
    .nav-links {
      float: none !important;
    }
    .cart-view {
      text-align: left !important;
    }
  }
}
</style>

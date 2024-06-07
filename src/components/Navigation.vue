<template>
  <div id="nav" class="navbar">
    <div class="navbar-content">
      <div class="logo">
        <img class="logo-image" alt="Vue logo" src="../assets/ff.png" />
      </div>
      <div class="nav-links">
        <router-link class="nav-link" to="/" exact active-class="active-link">Products</router-link>
        <router-link class="nav-link" to="/contactus" active-class="active-link">Contact Us</router-link>
      </div>
      <div class="cart-view">
        <router-link class="nav-link" to="/cart">View Cart ({{ getCartItemsCount }} items)</router-link>
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
* {
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

#nav {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin: 0;
  max-width: 100%;

  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1344px;
    margin: 0 auto;
    width: 100%;
  }

  .logo {
    display: flex;
    align-items: center;
    margin-right: 2rem;

    .logo-image {
      height: 80px;
      width: 80px;
    }
  }

  .nav-links {
    display: flex;
    align-items: center;

    .nav-link {
      margin-left: 2rem;
      font-size: 1.1rem;
      font-weight: bold;
      color: #333;
      text-decoration: none;

      &:hover {
        color: #007bff;
      }

      &.active-link {
        color: #007bff;
        font-weight: bold;
        border-bottom: solid 2px;
      }
    }
  }

  .cart-view {
    margin-left: auto;

    .nav-link {
      font-size: 1.1rem;
      font-weight: bold;
      color: #333;
      text-decoration: none;

      &:hover {
        color: #007bff;
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .cart-view {
      .nav-link {
        font-size: 1rem;
      }
    }

    .logo-image {
      height: 40px;
      width: 40px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;

    .cart-view {
      .nav-link {
        font-size: 0.9rem;
      }
    }
  }
}
</style>

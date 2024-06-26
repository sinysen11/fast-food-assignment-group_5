<template>
  <div id="nav" class="navbar">
    <div class="navbar-content">
      <div class="logo">
        <img class="logo-image" alt="Vue logo" src="../assets/ff.png" />
      </div>
      <div class="nav-links">
        <router-link v-if="canAccess('Products')" class="nav-link" to="/" exact
          active-class="active-link">Products</router-link>
        <router-link v-if="canAccess('Users')" class="nav-link" to="/users"
          active-class="active-link">Users</router-link>
        <router-link v-if="canAccess('History')" class="nav-link" to="/history"
          active-class="active-link">History</router-link>
        <router-link v-if="canAccess('Contact Us')" class="nav-link" to="/contactus" active-class="active-link">Contact Us</router-link>
      </div>
      <div class="cart-view">
        <router-link v-if="canAccess('View Cart')" class="nav-link view-cart-link" to="/cart"
          style="position: relative;">
          <font-awesome-icon :icon="['fas', 'shopping-cart']"
            style="margin-right: 5px; width: 26px; height: 18px; color: #717171;" />
          <span class="cart-item-count"
            style="position: absolute; top: 0; right: 0; transform: translate(50%, -50%); background-color: #007bff; color: #fff; border-radius: 50%; padding: 0px 6px; font-size: 0.8em; margin-right: 5px;">{{
              getCartItemsCount }}</span>
        </router-link>
        |
        <div class="navbar__right">
          <div v-if="!user">
            <router-link class="router__link" to="/login">
              <h5>Login</h5>
            </router-link>
          </div>
          <a v-if="user" class="router__link" href="" @click.prevent="logout">Logout</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navigation',
  components: {
  },
  data() {
    return {
      isLoginModalVisible: false,
      user: "",
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
      getUserRole: 'getUserRole',
      getCartItemsCount: 'getCartItemsCount',
    }),
  },
  methods: {
    ...mapActions(['login', 'logout']),

    openLoginModal() {
      this.isLoginModalVisible = true;
    },
    closeLoginModal() {
      this.isLoginModalVisible = false;
    },
    handleLogin(credentials) {
      this.login(credentials).then(() => {
        this.closeLoginModal();
      });
    },
    logout() {
      localStorage.removeItem("activeUser");
      window.location.href = "/login";
    },
    canAccess(link) {
      const users = JSON.parse(localStorage.getItem("activeUser"));
      if (users?.role === 'admin') {
        return ['Products', 'History', 'Users', 'Logout'].includes(link);
      } else if (users?.role === 'user') {
        return ['Products', 'History', 'Contact Us', 'View Cart', 'Logout'].includes(link);
      }
      return ['Products', 'History', 'Contact Us', 'View Cart', 'Login'].includes(link);
    },

    fetchCartItemsCount() {
      this.$store.dispatch('fetchCartItemsCount');
    },
  },
  mounted() {
    if (localStorage.activeUser) {
      let activeUser = localStorage.activeUser;
      this.user = JSON.parse(activeUser);
    }
  },
  created() {
    this.fetchCartItemsCount();
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
      font-size: 16px;
      margin-right: 5px;

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
    display: flex;

    .nav-link {
      font-size: 1.1rem;
      font-weight: bold;
      color: #333;
      font-size: 16px;
      text-decoration: none;

      &:hover {
        color: #007bff;
        text-decoration: underline;
      }
    }
  }

  .navbar__right {
    padding-left: 10px;

  }

  .navbar__right>h3 {
    cursor: pointer;
    color: rgb(255, 255, 255);
  }

  .view-cart-link {
    margin-right: 6px;
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

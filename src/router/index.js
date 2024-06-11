import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../components/Cart.vue";
import History from "../components/History.vue";
import Users from "../components/Users.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import ContactUs from "../components/ContactUs.vue"

Vue.use(VueRouter);

function guest(to, from, next) {
  if (localStorage.getItem("activeUser")) {
    next({ name: "Home" });
  } else {
    next();
  }
}

function guard(to, from, next) {
  if (localStorage.getItem("activeUser")) {
    next();
  } else {
    next({ name: "Login" });
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: guard,
    meta: {
      title: 'Fast-Food'
    }
  },
  {
    path: "/product/:id",
    name: "product",
    beforeEnter: guard,
    component: () =>
      import(
        /* webpackChunkName: "single-product" */ "../components/products/parts/Single.vue"
      ),
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    beforeEnter: guard,
  },
  {
    path: "/users",
    name: "users",
    component: Users,
    beforeEnter: guard,
  },
  {
    path: "/history",
    name: "history",
    component: History,
    beforeEnter: guard,
  },
  {
    path: "/contactus",
    name: "contactus",
    component: ContactUs,
    beforeEnter: guard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: guest,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: guest,
  },
  {
    path: "*",
    redirect: "/login",
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

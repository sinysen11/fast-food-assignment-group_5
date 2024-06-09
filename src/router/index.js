import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../components/Cart.vue";
import History from "../components/History.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Fast-Food'
    }
  },
  {
    path: "/product/:id",
    name: "product",
    component: () =>
      import(
        /* webpackChunkName: "single-product" */ "../components/products/parts/Single.vue"
      ),
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  },
  {
    path: "/history",
    name: "history",
    component: History
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

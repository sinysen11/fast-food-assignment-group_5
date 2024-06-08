import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../components/Cart.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/coupons",
    name: "coupons",
    component: () =>
      import(/* webpackChunkName: "coupons" */ "../views/Coupons.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

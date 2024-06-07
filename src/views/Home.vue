<template>
  <div class="home products">
    <h1 class="is-size-2 mb-4">Products</h1>
    <Products />
  </div>
</template>

<script>
import Products from "./../components/products/Products";
export default {
  name: "Home",
  components: {
    Products
  }
};
</script>
<style lang="scss" scoped>
.products {
  margin-top: 2rem;
}
@media screen and (max-width: 767px) {
  .products {
    h1 {
      padding: 0 30px;
    }
  }
}
</style>

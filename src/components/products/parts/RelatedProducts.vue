<template>
  <div class="related-products">
    <h3 class="title">You may also like:</h3>
    <div v-if="categoryProducts">
      <div class="columns is-multiline is-desktop is-widescreen is-fullhd">
        <div
          v-for="product in categoryProducts"
          :key="product.id"
          class="column is-3-fullhd is-3-widescreen is-6-desktop"
        >
          <Product :product="product" />
        </div>
      </div>
    </div>
    <div v-else>
      <facebook-loader></facebook-loader>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { FacebookLoader } from "vue-content-loader";
import Product from "./Product";
export default {
  name: "RelatedPrdocuts",
  components: {
    FacebookLoader,
    Product
  },
  props: ["product_category", "currentProduct"],
  computed: {
    ...mapGetters(["categoryProducts"])
  },
  methods: {
    ...mapActions(["fetchCategoryProducts"])
  },
  created() {
    this.fetchCategoryProducts({
      category: this.product_category,
      currentProductId: this.currentProduct
    });
  }
};
</script>
<style lang="scss" scoped>
.related-products {
  margin-top: 3rem;
}
@media screen and (max-width: 767px) {
  .related-products {
    h3 {
      padding: 0 30px;
    }
  }
}
</style>
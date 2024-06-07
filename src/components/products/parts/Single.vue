<template>
  <div v-if="singleProduct" class="product single">
    <div class="box">
      <article class="columns is-multiline">
        <div class="column is-4">
          <figure class="image">
            <img v-if="singleProduct !== undefined" :src="singleProduct.image" alt="Image" />
          </figure>
        </div>
        <div class="column is-8">
          <div class="content">
            <h1>{{ singleProduct.title }}</h1>
            <p>
              <strong>{{ singleProduct.category }}</strong>
            </p>
            <p>
              <strong>${{ singleProduct.price }}</strong>
            </p>
            <p>{{ singleProduct.description }}</p>
          </div>
          <div class="actions columns is-multiline">
            <div class="column is-4">
              <form action method="post" @submit.prevent="addThisToCart">
                <div class="field is-grouped">
                  <p class="control is-expanded">
                    <input class="input" type="number" min="1" v-model="quantity" required />
                  </p>
                  <p class="control">
                    <button class="button is-info add-to-cart-btn">Add to cart</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </article>
    </div>
    <related-products
      :product_category="singleProduct.category"
      :currentProduct="singleProduct.id"
    />
  </div>
  <div class="custom-loader" v-else>
    <facebook-loader></facebook-loader>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { FacebookLoader } from "vue-content-loader";
import RelatedProducts from "./RelatedProducts";
export default {
  name: "ProductSingle",
  components: {
    FacebookLoader,
    RelatedProducts
  },
  data() {
    return {
      quantity: 1
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchProductFromApi(to.params.id);
    next();
  },
  computed: {
    ...mapGetters(["singleProduct"])
  },
  methods: {
    ...mapActions(["fetchProductFromApi", "addToCart"]),
    addThisToCart() {
      this.addToCart({ qty: this.quantity, id: this.$route.params.id });
    }
  },
  created() {
    this.fetchProductFromApi(this.$route.params.id);
  }
};
</script>
<style lang="scss" scoped>
.custom-loader {
  margin-top: 3rem;
}
.product {
  &.single {
    margin-top: 3rem;
    .box {
      padding: 2rem;
    }
    .image {
      max-width: 400px;
      margin-right: 3rem;
    }
    .actions {
      margin-top: 3rem;
    }
  }
}
@media screen and (max-width: 767px) {
  .product {
    &.single {
      margin-top: 3rem;
      .box {
        padding: 1rem;
      }
      .image {
        max-width: 100%;
        margin-right: 0;
      }
      .actions {
        margin-top: 3rem;
      }
    }
  }
}
</style>

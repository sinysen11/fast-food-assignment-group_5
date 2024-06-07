<template>
  <div class="product">
    <div class="card">
      <div class="card-image">
        <figure class="image is-square">
          <img :src="product.image" alt="Product Image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="is-size-4 has-text-weight-bold mb-2 product-title">
              {{ product.title }}
            </p>
            <p class="subtitle is-6 has-text-semi-bold">Category: {{ "Fast Food" }}</p>
          </div>
        </div>
        <p class="has-text-weight-bold mb-2">Price: ${{ product.price }}</p>
        <div class="content">
          <p>{{ product.description.substring(0, 100) }}</p>
        </div>
        <div class="actions buttons">
          <router-link class="button is-success" :to="{ name: 'product', params: { id: product.id } }">More Info</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: ["product"],
  methods: {
    goToProduct(id) {
      this.$router.push({ name: "product", params: { id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.product {
  .card {
    min-height: 820px;
    .product-title {
      min-height: 160px;
    }
    .content {
      min-height: 80px;
    }
  }
  img {
    padding: 30px;
  }
}
</style>

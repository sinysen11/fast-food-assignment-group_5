<template>
  <div class="coupons">
    <div v-for="coupon in coupons" :key="coupon.code">
      <section class="hero is-medium is-primary is-bold mb-5" :class="coupon.css_class">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">Code: {{ coupon.code }}</h1>
            <h2 class="subtitle">
              Discount:
              <strong>{{ coupon.discount }}</strong>%
            </h2>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "Coupons",
  data() {
    return {
      coupons: this.$store.state.coupons.coupons
    };
  }
};
</script>
<style lang="scss" scoped>
.coupons {
  margin-top: 3rem;
}
</style>
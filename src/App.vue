<template>
  <div class="app">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <div class="container mt-4">
      <Navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
import { vueTopprogress } from "vue-top-progress";
import Navigation from "./components/Navigation";
export default {
  name: "App",
  components: {
    Navigation,
    vueTopprogress,
  },
  mounted() {
    this.$refs.topProgress.start();

    // Use setTimeout for demo
    setTimeout(() => {
      this.$refs.topProgress.done();
    }, 2000);
  },
};
</script>
<style lang="scss" scoped>
.app {
  margin-bottom: 2rem;
}
</style>

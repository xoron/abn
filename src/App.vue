<template>
  <h1>ABN - TV Shows</h1>
  <!-- <router-view /> -->

  <!-- Access URL params -->
  <!-- <div>aaas{{ $route.params.test }}</div> -->
  <Shows />
</template>

<script>
import { defineComponent } from "vue";
import Shows from "./organism/Shows.vue";


export default defineComponent({
  name: "App",
  components: {
    Shows,
  }
});
</script>

<style scoped>
h1 {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
</style>

<template>
  <!-- <h1>ABN - TV Shows</h1> -->
  <!-- <router-view /> -->

  <!-- Access URL params -->
  <!-- <div>aaas{{ $route.params.test }}</div> -->
  <Shows />

  <!-- show details page -->
  <Dialog v-model:visible="$route.params.id" maximizable modal header="Show" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :dismissableMask="true" @update:visible="() => $router.back()">
            <Show />
        </Dialog>

  <!-- search page -->
  <Dialog v-model:visible="isOnSearchPage" maximizable modal header="Search" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :dismissableMask="true" @update:visible="() => $router.back()">
    <Search />
  </Dialog>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRoute } from 'vue-router';
import Shows from "./organism/Shows.vue";
import Show from "./organism/Show.vue";
import Search from "./organism/Search.vue";



export default defineComponent({
  name: "App",
  components: {
    Shows,
    Show,
    Search
  },
  setup() {
    const route = useRoute();
    const isOnSearchPage = computed(() => {
      // Check if the current route is /search
      return route.path.includes('/search');
    });

    return { isOnSearchPage };
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

<template>
  <Shows />

  <!-- show details page -->
  <Dialog
    v-model:visible="isOnShowDetailsPage"
    maximizable
    modal
    header="Show"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :dismissable-mask="true"
    @update:visible="() => $router.back()"
  >
    <Show />
  </Dialog>

  <!-- search page -->
  <Dialog
    v-model:visible="isOnSearchPage"
    maximizable
    modal
    header="Search"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :dismissable-mask="true"
    @update:visible="() => $router.back()"
  >
    <Search />
  </Dialog>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import Shows from "../../molecules/shows/Shows.vue";
import Show from "../../molecules/show/Show.vue";
import Search from "../../molecules/search/Search.vue";

export default defineComponent({
  name: "App",
  components: {
    Shows,
    Show,
    Search,
  },
  setup() {
    const route = useRoute();
    const isOnSearchPage = computed(() => {
      return route.path.includes("/search");
    });
    const isOnShowDetailsPage = computed(() => {
      return route.path.includes("/show");
    });

    return {
      route,
      isOnSearchPage,
      isOnShowDetailsPage
    };
  },
});
</script>

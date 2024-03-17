<template>
  <div>
    <InputText
      placeholder="Search ABN shows"
      :value="searchQuery"
      @input="searchQuery = $event.target.value"
    />

    <Carousel
      v-if="searchResults.length > 0"
      :value="searchResults"
      :num-visible="3"
      :num-scroll="1"
      :responsive-options="responsiveOptions"
      :show-indicators="false"
    >
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2 p-3">
          <div class="mb-3">
            <div class="relative mx-auto">
              <Button
                data-test="show-button"
                @click="
                  async () => {
                    await $router.push(`/search/${searchQuery}`);
                    await $router.push(`/show/${slotProps.data?.show?.id}`);
                  }
                "
              >
                <ShowImage :show="slotProps.data.show" />
              </Button>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";

import { useShowsStore } from "../../store/store";
import ShowImage from '../../atoms/show-image/ShowImage.vue';

export default defineComponent({
  name: "SearchView",
  components: {
    ShowImage
  },
  setup() {
    const showsStore = useShowsStore();
    const route = useRoute();
    const searchQuery = ref(route.params.query || "");
    const searchResults = ref([]);

    const responsiveOptions = ref([
      {
        breakpoint: "1400px",
        numVisible: 4,
        numScroll: 1,
      },
      {
        breakpoint: "1199px",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "767px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "575px",
        numVisible: 1,
        numScroll: 1,
      },
    ]);

    const search = async () => {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchQuery.value}`
      );
      searchResults.value = await response.json();
      const transformedForStore = searchResults.value.map((result) => result.show);
      showsStore.addToStore(transformedForStore);
    };

    onMounted(() => {
      if (searchQuery.value) search();
    });

    watch(searchQuery, async (newValue) => {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${newValue}`
      ).catch((error) => {
        console.warn("Error fetching shows", error);
      })
      searchResults.value = await response.json();
    });

    return {
      searchQuery,
      searchResults,
      search,
      responsiveOptions
    };
  },
});
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
</style>

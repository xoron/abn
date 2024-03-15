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
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :showIndicators="false"

    >
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2 p-3">
          <div class="mb-3">
            <div class="relative mx-auto">
              <Button
                @click="async () => {
                    await $router.push(`/search/${searchQuery}`)
                    await $router.push(`/show/${slotProps.data?.show?.id}`)
                }"
              >
                <img
                  :src="slotProps.data.show.image?.medium"
                  :alt="slotProps.data.show.name"
                  class="w-full border-round"
                  width="130"
                  loading="lazy"
                />
                <Tag
                  :value="slotProps.data.show.name"
                  class="absolute"
                  style="left: 5px; top: 5px"
                />
                <Tag
                  :value="slotProps.data.show.rating.average ?? 'unrated'"
                  class="absolute"
                  style="bottom: 5px; left: 5px"
                />
              </Button>
            </div>
          </div>
          <!-- <div class="mb-3 font-medium">{{ slotProps.data.name }}</div> -->
          <div class="flex justify-content-between align-items-center">
            <!-- <div class="mt-0 font-semibold text-xl">${{ 'slotProps.data.price' }}</div> -->
            <span>
              <!-- <Button icon="pi pi-heart" severity="secondary" outlined />
                        <Button icon="pi pi-shopping-cart" class="ml-2"/> -->
            </span>
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
  reactive,
  watch,
  computed,
} from "vue";
import { useRoute } from 'vue-router';

export default defineComponent({
  name: "SearchView",
  components: {},
  setup() {
    const route = useRoute();
    const searchQuery = ref(route.params.query || "");
    const searchResults = ref([]);
    const pageNumber = ref(0);

    const nextPage = () => {
      pageNumber.value++;
      search();
    };

    const search = async () => {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchQuery.value}?page=${pageNumber.value}`
      );
      searchResults.value = await response.json();
      console.log("searchResults", searchResults.value);
    };

    // onMounted(() => {
    //   search();
    // });

    watch(searchQuery, async (newValue, oldValue) => {
      console.log("searchQuery changed", newValue, oldValue);
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchQuery.value}`
      );
      searchResults.value = await response.json();
    });

    return {
      searchQuery,
      searchResults,
      search,
      nextPage
    };
  },
});
</script>

<style scoped>
input {
    margin-bottom: 10px;
}
</style>

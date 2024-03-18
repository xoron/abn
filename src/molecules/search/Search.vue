<template>
  <div>
    <InputText
      placeholder="Search ABN shows"
      :value="searchQuery"
      data-test="search-input"
      autofocus
      @input="searchQuery = $event.target.value"
    />

    <div
      v-if="searchResults.length === 0 && searchQuery"
    >
      <TryAgain
        data-test="try-again"
        :action="search"
      />
    </div>

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
                class="show-button"
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
  computed
} from "vue";
import { useRoute } from "vue-router";

import { useShowsStore } from "../../store/store";
import ShowImage from '../../atoms/show-image/ShowImage.vue';
import TryAgain from '../../atoms/try-again/TryAgain.vue';

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

export default defineComponent({
  name: "SearchView",
  components: {
    ShowImage,
    TryAgain
  },
  setup() {
    const showsStore = useShowsStore();
    const route = useRoute();
    const searchQuery = ref(route.params.query || "");
    const searchResults = ref([]);
    const loading = ref(false);
    const somethingWentWrong = computed(() =>
      !loading.value &&
      searchResults.value.length === 0 &&
      !!searchQuery.value
    );

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
      loading.value = true;
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchQuery.value}`
      ).catch((error) => {
        console.warn("Error fetching shows", error);
        loading.value = false;
      });
      loading.value = false;
      searchResults.value = await response.json();
      const transformedForStore = searchResults.value.map((result) => result.show);
      showsStore.addToStore(transformedForStore);
    };

    onMounted(() => {
      if (searchQuery.value) search();
    });

    const debouncedSearch = debounce(search, 500);
    watch(searchQuery, () => {
      debouncedSearch();
    });

    return {
      searchQuery,
      searchResults,
      search,
      responsiveOptions,
      somethingWentWrong
    };
  },
});
</script>

<style scoped>
.show-button {
  background-color: transparent;
  border: none;
  border-radius: 0;
}
input {
  margin-bottom: 10px;
}
</style>

<template>
  <Toolbar class="toolbar">

    <template #start>
      <InputText
        placeholder="Search ABN shows"
        :value="search"
        @input="search = $event.target.value"
      />
    </template>

    <template #end>
      <Button @click="fetchNextPage" data-test="previous-page-button">
        Load more (TV shows: {{ cachedData.cache.length }})
      </Button>
      <Button
      @click="$router.push('/search')"
      data-test="previous-page-button"
      >
        🔎
      </Button>
    </template>
  </Toolbar>
  <div class="container" data-test="shows">
    <Category
      v-for="genre in genres"
      :key="genre"
      :category="genre"
      :list="
        cachedData.cache
          .filter(
            (s) =>
              s.genres.includes(genre) &&
              s.name.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) => a.rating?.average - b.rating?.average)
      "
    />
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
import Category from "./Category.vue";

// debounce function
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

export default defineComponent({
  name: "ShowsView",
  components: {
    Category,
  },
  setup() {
    const search = ref("");
    const genres = ref([]);
    // const ratings = ref([]);
    const cachedData = reactive({
      cache: [],
    });

    // const options = reactive([
    //   {
    //     label: `Load more (cached: ${cachedData.cache.length})`,
    //     command: () => fetchNextPage(),
    //   },
    //   {
    //     label: "Delete",
    //   },
    // ]);

    watch(cachedData, (newValue, oldValue) => {
      console.log("cachedData changed", newValue, oldValue);
      genres.value = newValue.cache
        .map((show) => show.genres)
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
      // ratings.value = newValue.cache
      //   .map((show) => show.rating?.average)
      //   .filter((value, index, self) => self.indexOf(value) === index)
      //   .sort()
      //   .reverse();
    });

    const pageNumber = ref(1);

    const searchShows = async (search) => {
      const response = await fetch(
        `https://api.tvmaze.com/shows?q=${search}`
      ).catch((error) => {
        console.error("Error fetching shows", error);
      });

      const newData = await response.json();
      cachedData.cache = [...cachedData.cache, ...newData];
    };

    const deBouncedSearchShows = debounce(searchShows, 500);

    watch(search, (newValue, oldValue) => {
      console.log("search changed", newValue, oldValue);
      // deBouncedSearchShows(newValue);
    });

    const fetchShows = async () => {
      const response = await fetch(
        `https://api.tvmaze.com/shows?page=${pageNumber.value}`
      ).catch((error) => {
        console.error("Error fetching shows", error);
      });
      const newData = await response.json();
      cachedData.cache = [...cachedData.cache, ...newData];
    };

    const fetchNextPage = () => {
      pageNumber.value++;
      fetchShows();
    };

    onMounted(() => {
      console.log("Component is mounted!");
      fetchShows();
    });

    return {
      pageNumber,
      genres,
      // ratings,
      cachedData,
      fetchShows,
      fetchNextPage,
      // options,
      search,
    };
  },
});
</script>

<style scoped>
.toolbar {
  position: fixed;
  z-index: 1;
}

.container {
  padding-top: 60px;
}

button {
  margin-right: 10px;
}

img {
  ming-height: 100px;
}
</style>

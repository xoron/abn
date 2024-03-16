<template>
  <Toolbar class="toolbar">
    <template #start>
      <InputText
        placeholder="Search ABN shows"
        :value="search"
        @input="search = $event.target.value"
      />
      <Button
        data-test="previous-page-button"
        @click="$router.push(`/search/${search}`)"
      >
        🔎
      </Button>
    </template>

    <template #end>
      <Button
data-test="previous-page-button"
@click="fetchNextPage"
>
        Cache more (TV shows: {{ cachedData.cache.length }})
      </Button>
    </template>
  </Toolbar>
  <div
class="container"
data-test="shows"
>
    <Category
      v-for="genre in genres"
      :key="genre"
      data-test="genre"
      :category="genre"
      :list="
        cachedData.cache
          .filter(
            (s) =>
              s.genres.includes(genre) &&
              s.name.toLowerCase().includes(search.toLowerCase()) 
          )
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
} from "vue";
import Category from "../../molecules/categories/Category.vue";

export default defineComponent({
  name: "ShowsView",
  components: {
    Category,
  },
  setup() {
    const search = ref("");
    const genres = ref([]);
    const cachedData = reactive({
      cache: [],
    });

    watch(cachedData, (newValue, oldValue) => {
      console.log("cachedData changed", newValue, oldValue);
      genres.value = newValue.cache
        .map((show) => show.genres)
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
    });

    const pageNumber = ref(1);

    // const searchShows = async (search) => {
    //   const response = await fetch(
    //     `https://api.tvmaze.com/shows?q=${search}`
    //   ).catch((error) => {
    //     console.error("Error fetching shows", error);
    //   });

    //   const newData = await response.json();
    //   cachedData.cache = [...cachedData.cache, ...newData];
    // };

    // watch(search, (newValue, oldValue) => {
    //   console.log("search changed", newValue, oldValue);
    //   searchShows(newValue);
    // });

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
      fetchShows();
    });

    return {
      pageNumber,
      genres,
      cachedData,
      fetchShows,
      fetchNextPage,
      search,
    };
  },
});
</script>

<style scoped>
.toolbar {
  position: fixed;
  width: 98%;
  z-index: 1;
}

.container {
  padding-top: 60px;
}

input {
  margin-right: 10px;
}
</style>

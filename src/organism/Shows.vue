<template>
  <div data-test="shows">

    <h2>Shows</h2>
    <!-- <router-view /> -->
  
    <!-- Access URL params -->
    <!-- <div>aaas{{ $route.params.test }}</div> -->
    <!-- <button
      @click="fetchShows"
      data-test="fetch-shows-button"
    >Fetch shows</button> -->

    <button
      @click="fetchNextPage"
      data-test="previous-page-button"
    >Load more (cached: {{ cachedData.cache.length }})</button>
    <select>
      <option value="">Select Genre</option>
      <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
    </select>

    <select>
      <option value="">Select Rating</option>
      <option v-for="rating in ratings" :key="rating" :value="rating">{{ rating }}</option>
    </select>
    <Genre
      v-for="genre in genres"
      :key="genre"
      :genre="genre"
      :list="cachedData.cache.filter(s => s.genres.includes(genre))"
      />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import Genre from "./Genre.vue";

export default defineComponent({
  name: "App",
  components: {
    Genre,
  },
  setup() {
    const genres = ref([]);
    const ratings = ref([]);
    const cachedData = reactive({
      cache: [],
    })

    watch(cachedData, (newValue, oldValue) => {
      console.log('cachedData changed', newValue, oldValue);
      genres.value = newValue.cache
        .map((show) => show.genres)
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort();
      ratings.value = newValue.cache
        .map((show) => show.rating?.average)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort()
        .reverse();
    });

    const pageNumber = ref(1);

    const fetchShows = async () => {
      const response = await fetch(`https://api.tvmaze.com/shows?page=${pageNumber.value}`)
        .catch((error) => {
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
      console.log('Component is mounted!');
      fetchShows();
    });

    return { pageNumber, genres, ratings, cachedData, fetchShows, fetchNextPage };
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
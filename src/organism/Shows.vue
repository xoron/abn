<template>
  <h2>Shows</h2>
  <!-- <router-view /> -->

  <!-- Access URL params -->
  <!-- <div>aaas{{ $route.params.test }}</div> -->
  <Genre v-for="genre in genres" :key="genre" :genre="genre" />
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import Genre from "./Genre.vue";

export default defineComponent({
  name: "App",
  components: {
    Genre,
  },
  setup() {
    const genres = ref([]);
    const pageNumber = ref(1);

    const fetchShows = async () => {
      const response = await fetch(`https://api.tvmaze.com/shows?page=${pageNumber.value}`);
      const shows = await response.json();
      genres.value = shows
        .map((show) => show.genres)
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index)
    };

    onMounted(() => {
      console.log('Component is mounted!');
      fetchShows();
    });

    return { genres };
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
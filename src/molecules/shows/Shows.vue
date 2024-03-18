<template>
  <Toolbar class="toolbar">
    <template #end>
      <Button
        data-test="previous-page-button"
        type="submit"
        @click="$router.push(`/search`)"
      >
        🔎
      </Button>
    </template>
  </Toolbar>
  <div
    class="container"
    data-test="shows"
  >
    <div
      v-if="genres.length === 0"
      class="centered"
    >
      <TryAgain
        data-test="try-again"
        :action="fetchShows"
      />
    </div>

    <Category
      v-for="genre in genres"
      :key="genre"
      data-test="genre"
      :category="genre"
      :list="getSearchFilteredList(genre)"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, computed } from "vue";
import { useShowsStore } from "../../store/store";
import Category from "../../molecules/categories/Category.vue";
import TryAgain from "../../atoms/try-again/TryAgain.vue";

export default defineComponent({
  name: "ShowsView",
  components: {
    Category,
    TryAgain
  },
  setup() {
    const showsStore = useShowsStore();
    const cachedData = computed(() => showsStore.cache);
    const genres = computed(() => showsStore.genres);
    const filteredAndSortedShows = computed(
      () => showsStore.filteredAndSortedShows
    );
    const pageNumber = computed(() => showsStore.pageNumber);
    const getSearchFilteredList = (genre) =>
      cachedData.value.filter((s) => s.genres.includes(genre));

    onMounted(() => {
      showsStore.fetchShows();
    });

    return {
      pageNumber,
      genres,
      filteredAndSortedShows,
      cachedData,
      getSearchFilteredList,
      fetchShows: showsStore.fetchShows,
    };
  },
});
</script>

<style scoped>
.toolbar {
  position: fixed;
  border: 0;
  border-radius: 0;
  width: 100%;
  z-index: 1;
  background-color: #004d41;
}

.toolbar button {
  background: #ffd200;
  border: 1px solid #ffd200;
  border-radius: 0;
}

.toolbar input {
  border-radius: 0;
}

.container {
  padding-top: 60px;
}

form {
  margin: 0;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
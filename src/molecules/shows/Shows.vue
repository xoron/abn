<template>
  <Toolbar class="toolbar">
    <template #end>
      <form @submit.prevent>
        <InputText
          placeholder="Search ABN shows"
          :value="search"
          @input="search = $event.target.value"
        />
        <Button
          data-test="previous-page-button"
          type="submit"
          @click="$router.push(`/search/${search}`)"
        >
          🔎
        </Button>
      </form>
    </template>
  </Toolbar>
  <div class="container" data-test="shows">
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
import { defineComponent, onMounted, ref, computed } from "vue";
import { useShowsStore } from "../../store/store";
import Category from "../../molecules/categories/Category.vue";

export default defineComponent({
  name: "ShowsView",
  components: {
    Category,
  },
  setup() {
    const showsStore = useShowsStore();
    const search = ref("");
    const cachedData = computed(() => showsStore.cache);
    const genres = computed(() => showsStore.genres);
    const filteredAndSortedShows = computed(
      () => showsStore.filteredAndSortedShows
    );
    const pageNumber = computed(() => showsStore.pageNumber);
    const getSearchFilteredList = (genre) =>
      cachedData.value.filter(
        (s) =>
          s.genres.includes(genre) &&
          s.name.toLowerCase().includes(search.value.toLowerCase())
      );

    onMounted(() => {
      showsStore.fetchShows();
    });

    return {
      pageNumber,
      genres,
      filteredAndSortedShows,
      cachedData,
      search,
      getSearchFilteredList,
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

form {
  margin: 0;
}

input {
  margin-right: 10px;
}
</style>

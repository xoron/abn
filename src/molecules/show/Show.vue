<template>
  <RenderVisible>
    <div class="show-container">
      <div class="show-image relative">
        <ShowImage :show="show" />
      </div>

      <div class="show-details">
        <h1>{{ show?.name }}</h1>
        <p v-if="show?.rating?.average">
Rating: {{ show?.rating?.average }}
</p>
        <!-- Could make this safer by sanitizing the html here but the api comes with markup -->
        <p v-html="show?.summary"></p>
      </div>
    </div>
  </RenderVisible>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import RenderVisible from "../../atoms/render-visible/RenderVisible.vue";
import ShowImage from "../../atoms/show-image/ShowImage.vue";

export default defineComponent({
  name: "App",
  components: {
    RenderVisible,
    ShowImage,
  },
  props: {
    showId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const route = useRoute();
    const show = ref({
      id: props.showId ? props.showId : route.params.id,
    });

    onMounted(async () => {
      const response = await fetch(
        `https://api.tvmaze.com/shows/${show.value.id}`
      ).catch((error) => {
        console.error("Error fetching show", error);
      });
      show.value = await response.json();
    });
    return { show };
  },
});
</script>

<style scoped>
.show-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

/* make it vertical when in mobile view */
@media (max-width: 700px) {
  .show-container {
    grid-template-columns: 1fr;
  }

  /* center the image */
  .show-image {
    text-align: center;
  }
}
</style>

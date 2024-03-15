<template>
  <div class="show-container">
    <div class="show-image">
      <img :src="show?.image?.medium" :alt="show?.name" loading="lazy" />
    </div>

    <div class="show-details">
      <h1>{{ show?.name }}</h1>
      <!-- rating -->
      <p v-if="show?.rating?.average">Rating: {{ show?.rating?.average }}</p>
      <p v-html="show?.summary"></p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  props: {
    showId: String,
  },
  setup() {
    const route = useRoute();
    const showDialog = ref(false);
    const show = ref({
      id: 1,
      name: "Show Name",
      image: {
        medium: "https://cataas.com/cat",
      },
      summary: "<p>Summary of the show</p>",
    });

    onMounted(async () => {
      console.log("Show mounted");
      const response = await fetch(
        `https://api.tvmaze.com/shows/${route.params.id}`
      );
      show.value = await response.json();
    });
    return { showDialog, show };
  },
});
</script>

<style scoped>
h1 {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.show-container {
  display: grid;
  grid-template-columns: 1fr 2fr; /* Adjust the ratio according to your needs */
  gap: 20px; /* Spacing between columns */
}
</style>

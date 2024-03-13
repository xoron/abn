<template>
  <div>
    <h3>{{ genre }}</h3>
    <Carousel
      :itemsToShow="3.95"
      :transition="500"
      class="divide-y divide-gray-200"
    >
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">
          <Show />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Show from "./Show.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default defineComponent({
  name: "App",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    Show,
  },
  props: {
    genre: String,
  },
});
</script>

<style scoped>
h1 {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}
</style>

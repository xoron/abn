<template>
  <div v-if="list.length > 0" data-test="category">
    <h3>{{ category }}</h3>

    <Carousel
      :value="list.sort((a, b) => b.rating?.average - a.rating?.average)"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :showIndicators="false"
    >
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2 p-3">
          <div class="mb-3">
            <div class="relative mx-auto">
              <Button
                @click="() => $router.push(`/show/${slotProps.data?.id}`)"
              >
                <img
                  :src="slotProps.data.image?.medium"
                  :alt="slotProps.data.name"
                  class="w-full border-round"
                  loading="lazy"
                />
                <Tag
                  :value="slotProps.data.name"
                  class="absolute"
                  style="left: 5px; top: 5px"
                />
                <Tag
                  v-if="slotProps.data.rating.average"
                  :value="slotProps.data.rating.average"
                  class="absolute"
                  style="bottom: 5px; left: 5px"
                />
              </Button>
            </div>
          </div>
          <!-- <div class="mb-3 font-medium">{{ slotProps.data.name }}</div> -->
          <div class="flex justify-content-between align-items-center">
            <!-- <div class="mt-0 font-semibold text-xl">${{ 'slotProps.data.price' }}</div> -->
            <span>
              <!-- <Button icon="pi pi-heart" severity="secondary" outlined />
                        <Button icon="pi pi-shopping-cart" class="ml-2"/> -->
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Show from "./Show.vue";
const responsiveOptions = ref([
  {
    breakpoint: "1920px",
    numVisible: 5,
    numScroll: 1,
  },
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
// import "vue3-carousel/dist/carousel.css";
// import {
//   Carousel,
//   Slide,
//   // Pagination,
//   Navigation
// } from "vue3-carousel";

export default defineComponent({
  name: "CategoryView",
  setup: () => {
    return {
      responsiveOptions,
    };
  },
  components: {
    // Carousel,
    // Slide,
    // // Pagination,
    // Navigation,
    Show,
  },
  props: {
    category: String,
    list: Array,
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

img {
  width: 200px;
  height: 300px;
}
</style>

<template>
  <div
v-if="list.length > 0"
data-test="category"
class="category-container"
>
    <h3>{{ category }}</h3>

    <Carousel
      :value="list.sort((a, b) => b.rating?.average - a.rating?.average)"
      :num-visible="3"
      :num-scroll="1"
      :responsive-options="responsiveOptions"
      :show-indicators="false"
    >
      <template #item="slotProps">
        <RenderVisible>
          <div class="border-1 surface-border border-round m-2 p-3">
            <div class="mb-3">
              <div class="relative mx-auto">
                <Button
                  class="show-button"
                  @click="() => $router.push(`/show/${slotProps.data?.id}`)"
                >
                  <ShowImage :show="slotProps.data" />
                </Button>
              </div>
            </div>
          </div>
        </RenderVisible>
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ShowImage from "../../atoms/show-image/ShowImage.vue";
import RenderVisible from "../../atoms/render-visible/RenderVisible.vue";
const responsiveOptions = ref([
  {
    breakpoint: "1920px",
    numVisible: 7,
    numScroll: 6,
  },
  {
    breakpoint: "1400px",
    numVisible: 6,
    numScroll: 5,
  },
  {
    breakpoint: "1200px",
    numVisible: 5,
    numScroll: 4,
  },
  {
    breakpoint: "831px",
    numVisible: 4,
    numScroll: 3,
  },
  {
    breakpoint: "636px",
    numVisible: 3,
    numScroll: 2,
  },
  {
    breakpoint: "575px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "460px",
    numVisible: 1,
    numScroll: 1,
  },

]);

export default defineComponent({
  name: "CategoryView",
  components: {
    ShowImage,
    RenderVisible
  },
  props: {
    category: {
      type: String,
      required: true,
      default: "",
    },
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup: () => {
    return {
      responsiveOptions,
    };
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

.show-button {
  background-color: transparent;
  border: none;
  border-radius: 0;
}

.category-container {
  margin: 0 10px;
}
</style>

<style>
div.relative.mx-auto {
  justify-content: center;
  display: flex;
}

button.p-link.p-disabled {
  visibility: hidden;
}
</style>
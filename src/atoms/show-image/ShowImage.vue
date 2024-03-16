<template>
    <RenderVisible>
        <div class="container relative">
            <img
                :src="show.image?.medium"
                :alt="show.name"
                class="w-full border-round"
                width="130"
                loading="lazy"
                data-testid="show-image"
            />
            <Tag
                :value="show.name"
                class="absolute"
                style="left: 5px; top: 5px"
                data-testid="show-name"
            />
            <Tag
                :value="show.rating?.average ? `⭐ ${show.rating.average}` : 'unrated'"
                class="absolute"
                style="bottom: 5px; left: 5px"
                data-testid="show-rating"
            />
        </div>
    </RenderVisible>
</template>

<script>
import RenderVisible from '../render-visible/RenderVisible.vue';

export default {
    name: 'ShowImage',
    components: {
        RenderVisible,
    },
    props: {
        show: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
.container {
    height: 182px;
    width: 130px;
}
img {
    height: 100%;
    width: 100%;
    border-radius: 0.5rem;
    background-image: url('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif');
    background-size: contain;
}
</style>
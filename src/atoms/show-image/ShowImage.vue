<template>
    <RenderVisible>
        <div class="container relative">
            <img
                :src="show.image?.medium"
                :alt="show.name"
                class="w-full border-round"
                loading="lazy"
                data-testid="show-image"
            />
            <Tag
                :value="show.name"
                class="absolute tag top"
                data-testid="show-name"
            />
            <Tag
                :value="show.rating?.average ? `⭐ ${show.rating.average}` : 'unrated'"
                class="absolute tag bottom"
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
.absolute {
    position: absolute;
}

.relative {
    position: relative;
}
img {
    height: 100%;
    width: 100%;
    background-image: url('https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif');
    background-size: contain;
}

.tag {
    background-color: #fff;
    color: #111;
    left: 5px;
}

.top {
    top: 5px;
}

.bottom {
    bottom: 5px;
}
</style>
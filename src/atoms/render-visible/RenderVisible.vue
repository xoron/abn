<template>
    <div ref="container">
        <slot v-if="isVisible" />
    </div>
</template>

<script>
import {
    ref,
    onMounted
} from 'vue';

export default {
    setup() {
        const container = ref(null);
        const isVisible = ref(false);
        onMounted(() => {
            const observer = new IntersectionObserver(handleIntersection);
            observer.observe(container.value);
        });

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value = true;
                }
            });
        };

        return {
            handleIntersection,
            isVisible,
            container
        };
    }
};
</script>

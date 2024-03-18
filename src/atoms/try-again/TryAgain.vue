<template>
  <div>
    <h1>Fetching TV shows...</h1>
    <Button
      data-test="button"
      @click="action"
    >
      Click here to try again.
    </Button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TryAgain',
  props: {
    action: {
      type: Function,
      required: true,
    },
  },
});

</script>

<style scoped>
/* .centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
} */
</style>

<template>
  <div v-focus class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutPage',
  data: () => ({
    data: null,
  }),
  async preload() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: 'AboutPage preload data',
    };
  },
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

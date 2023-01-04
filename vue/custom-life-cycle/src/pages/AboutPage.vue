<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});

</script>
<template>
  <div v-focus class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

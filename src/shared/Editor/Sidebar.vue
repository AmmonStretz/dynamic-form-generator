<template>
  <aside class="sidebar">
    sidebar
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
  },
})
export default class Sidebar extends Vue {
  mounted() {
  }
}
</script>

<style scoped lang="scss">
  .sidebar{
    position: fixed;
    right: 0;
    top: 0;
  }
</style>

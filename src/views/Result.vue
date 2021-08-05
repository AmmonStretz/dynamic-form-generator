<template>
  <div class="result-view">
    <h1>Resultat</h1>
    <PathView :config="config" :path="currentStatus"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PathView from '../shared/Results/PathView/PathView.vue';

@Component({
  components: {PathView},
})
export default class ResultView extends Vue {

  get currentStatus() {
    return this.$store.getters.config.getAllPaths()
  }
  get config() {
    return this.$store.getters.config
  }

  mounted() {
  }
}
</script>

<style scoped lang="scss">
  .result-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
  }
</style>

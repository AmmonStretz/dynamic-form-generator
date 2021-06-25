<template>
  <div class="home">
    <FinderComponent
      v-if="!!config"
      v-bind:config="config"
      v-on:change="statusChange"
      v-on:submit="submit"
    ></FinderComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FinderConfig, FinderStatus } from "../shared/DynamicForm/Finder/Finder.config";
// import { JsonParser } from "@/shared/DynamicForm/parser";
import FinderComponent from "../shared/DynamicForm/Finder/Finder.vue";
import FinderService from "../shared/DynamicForm/services/Finder.service";

@Component({
  components: {
    FinderComponent,
  },
})
export default class Home extends Vue {
  public $store: any;
  get config(): FinderConfig{
    return this.$store.getters.config;
  }
  constructor() {
    super();
    let c = this.config;
    c.createStatus();
    this.$store.commit("updateConfig", c);
  }
  

  statusChange(status: FinderStatus) {}
  cancel() {
  }
  submit(status: FinderStatus) {
  }
}
</script>

<style scoped lang="scss">
</style>

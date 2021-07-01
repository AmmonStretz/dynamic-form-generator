<template>
  <div class="home">
    <FinderComponent
      v-if="!!config"
      v-bind:config="config"
      v-on:change="statusChange"
      v-on:submit="submit"
      v-on:cancel="cancel"
    ></FinderComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FinderConfig, FinderStatus } from "../shared/DynamicForm/Finder/Finder.config";
// import { JsonParser } from "@/shared/DynamicForm/parser";
import FinderComponent from "../shared/DynamicForm/Finder/Finder.vue";

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
    console.log('cancel');
    
  }
  submit(status: FinderStatus) {
    console.log('submit', status);
  }
}
</script>

<style scoped lang="scss">
</style>

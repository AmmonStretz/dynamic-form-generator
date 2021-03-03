<template>
  <div class="home">
    <WizzardComponent
      v-if="!!config"
      v-bind:config="config"
      v-on:change="statusChange"
      v-on:submit="submit"
    ></WizzardComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { JsonParser } from "@/shared/DynamicForm/parser";
import WizzardComponent from "../shared/DynamicForm/Wizzard/Wizzard.vue";
import {
  WizzardConfig,
  WizzardStatus,
} from "../shared/DynamicForm/Wizzard/Wizzard.config";
import { config } from "../shared/data/wizzard.config";
import { WizzardParser } from "../shared/DynamicForm/Wizzard/Wizzard.parser";

@Component({
  components: {
    WizzardComponent,
  },
})
export default class Home extends Vue {
  public config: WizzardConfig = this.generateWizzard();

  generateWizzard(): WizzardConfig {
    let wizzard = WizzardParser.parseFromJSON(config);
    wizzard.createStatus();
    console.log(1,wizzard);
    
    // INIT status or load from Cookie
    return wizzard;
  }

  statusChange(status: WizzardStatus) {}
  cancel() {
  }
  submit(status: WizzardStatus) {
    console.log("submit", status);
  }
}
</script>

<style scoped lang="scss">
</style>

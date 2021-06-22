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
// import WizardComponent from "../shared/DynamicForm/Wizard/Wizard.vue";
import FinderComponent from "../shared/DynamicForm/Finder/Finder.vue";
// import {
//   WizardConfig,
//   WizardStatus,
// } from "../shared/DynamicForm/Wizard/Wizard.config";
// import WizardService from "../shared/DynamicForm/services/Wizard.service";
import FinderService from "../shared/DynamicForm/services/Finder.service";

@Component({
  components: {
    FinderComponent,
  },
})
export default class Home extends Vue {
  public config: FinderConfig = FinderService.finder;
  constructor() {
    super();
    FinderService.finder.createStatus();
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

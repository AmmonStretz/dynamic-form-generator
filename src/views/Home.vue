<template>
  <div class="home">
    <WizardComponent
      v-if="!!config"
      v-bind:config="config"
      v-on:change="statusChange"
      v-on:submit="submit"
    ></WizardComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { JsonParser } from "@/shared/DynamicForm/parser";
import WizardComponent from "../shared/DynamicForm/Wizard/Wizard.vue";
import {
  WizardConfig,
  WizardStatus,
} from "../shared/DynamicForm/Wizard/Wizard.config";
import WizardService from "../shared/DynamicForm/services/Wizard.service";

@Component({
  components: {
    WizardComponent,
  },
})
export default class Home extends Vue {
  public config: WizardConfig = this.generateWizard();

  generateWizard(): WizardConfig {
    let wizard = WizardService.loadWizards('afq');
    wizard.createStatus();
    
    // INIT status or load from Cookie
    return wizard;
  }

  statusChange(status: WizardStatus) {}
  cancel() {
  }
  submit(status: WizardStatus) {
  }
}
</script>

<style scoped lang="scss">
</style>

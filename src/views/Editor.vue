<template>
  <div class="editor">
    EDITOR
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
import { config } from "../shared/data/wizard.config";
import WizardService from "../shared/DynamicForm/services/Wizard.service";

@Component({
  components: {
    WizardComponent,
  },
})
export default class Editor extends Vue {
  // public config: WizardConfig = this.generateWizard();

  // generateWizard(): WizardConfig {
  //   let wizard = WizardParser.parseFromJSON(config);
  //   wizard.createStatus();
  //   console.log(1,wizard);
    
  //   // INIT status or load from Cookie
  //   return wizard;
  // }

  // statusChange(status: WizardStatus) {}
  // cancel() {
  // }
  // submit(status: WizardStatus) {
  //   console.log("submit", status);
  // }
}
</script>

<style scoped lang="scss">
</style>

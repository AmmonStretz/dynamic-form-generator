<template>
  <div class="wizard-editor">
    WizardEditor
    <div class="forms" v-if="wizard">
      <div v-for="(form, index) of wizard.forms" :key="index">
        {{index}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WizardService from "../DynamicForm/services/Wizard.service";
import { WizardConfig } from "../DynamicForm/Wizard/Wizard.config";

@Component({
  components: {
  },
})
export default class WizardEditor extends Vue {

  public wizard: WizardConfig = this.generateWizard();

  generateWizard(): WizardConfig {
    let wizard = WizardService.loadWizards('afq');
    // clear Status
    console.log(wizard);
    
    return wizard;
  }

  mounted() {
  }
}
</script>

<style scoped lang="scss">
</style>

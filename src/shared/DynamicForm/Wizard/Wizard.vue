<template>
  <div class="wizard">
    <!-- TODO: ADD NAVIGATION -->
    <h1 v-if="!!config.settings && !!config.settings.title">
      {{ config.settings.title }}
    </h1>
    <div v-if="currentStatus">
      <div class="forms" v-for="(form, i) in config.forms" :key="i">
        <FormComponent
          v-if="i == currentStatus.index"
          v-bind:config="form"
          v-bind:root="config"
          v-on:change="onChange"
          ref="forms"
        ></FormComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import FormComponent from "../Form/Form.vue";
import { WizardConfig, WizardStatus } from "./Wizard.config";
import { FormConfig, FormStatus } from "../Form/Form.config";

@Component({
  components: {
    FormComponent,
  },
})
export default class WizardComponent extends Vue {
  @Prop() public config!: WizardConfig;

  public get currentStatus() {
    return this.config.status;
  }

  @Emit("change")
  onChange(status: FormStatus): WizardStatus {
    this.config.forms[this.config.status.index].status = status;
    return this.config.status;
  }

  @Emit("submit")
  submit() {
    return this.config.status;
  }

  onBefore() {
    for (let i = this.config.status.index - 1; i >= 0; i--) {
      if (this.config.forms[i].status.isVisible) {
        this.config.status.index = i;
        return;
      }
    }
  }
  onAfter() {
    const currentFormConfig: FormConfig =
      this.config.forms[this.currentStatus.index];
    if (
      currentFormConfig.status.isValid ||
      !currentFormConfig.status.isVisible
    ) {
      if (this.config.status.index < this.config.forms.length - 1) {
        for (
          let i = this.config.status.index + 1;
          i < this.config.forms.length;
          i++
        ) {
          if (this.config.forms[i].status.isVisible) {
            this.config.status.index = i;
            return;
          }
        }
      }
      this.submit();
    } else {
      this.config.status.showAllErrors();
      this.config.status.update();
      return;
    }
  }
}
</script>

<style scoped lang="scss">
nav a {
  &.active {
    text-decoration: underline;
  }
  &.enabled {
    color: blue;
  }
}
</style>

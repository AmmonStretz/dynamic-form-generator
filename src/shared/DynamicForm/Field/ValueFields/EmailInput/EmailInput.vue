<template>
  <div class="text-input">
    <label v-if="config.settings && config.settings.name" :for="config.key">{{config.settings.name}}:</label>
    <input
      v-if="config && config.status"
      type="email"
      ref="input"
      :id="config.key"
      :placeholder="config.settings.placeholder"
      :maxlength="config.settings.maxLength"
      v-model="config.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{'show': config.status.showErrors, 'valid': config.status.isValid}"
    />
    <div v-if="config.status.showErrors && config.status.errors && config.status.errors[0]">{{config.status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { EmailInputConfig } from "./EmailInput.config";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.config";

@Component({
  name: 'EmailInput'
})
export default class EmailInput extends Vue {
  @Prop() private config!: EmailInputConfig;
  @Prop() public status: ValueFieldStatus<string>;

  public $refs: any;

  setBlur() {
    this.config.status.showErrors = true;
    this.updateStatus();
  }
  @Emit("change")
  updateStatus(): ValueFieldStatus<string> {
    this.config.status.errors = Validator.checkFieldValidity(this.config.status.value, this.config.validators);
    this.config.status.isValid = this.config.status.errors.length == 0;
    this.status = this.config.status;
    return this.config.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>
<template>
  <div class="checkbox">
    <label v-if="config.settings && config.settings.name" :for="config.key">{{
      config.settings.name
    }}</label>
    <input
      v-if="config.status"
      type="checkbox"
      ref="input"
      :id="config.key"
      :placeholder="config.settings.placeholder"
      v-model.number="config.status.value"
      @change="onChange()"
      :class="{ show: config.status.showErrors, valid: config.status.isValid }"
    /><br>
    <div 
      class="error-message" v-if="config.status.showErrors && config.status.errors && config.status.errors[0]">{{config.status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { CheckboxConfig } from "./Checkbox.config";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.config";

@Component({
  name: "Checkbox",
})
export default class Checkbox extends Vue {
  @Prop() private config!: CheckboxConfig;
  @Prop() public status: ValueFieldStatus<boolean>;
  public $refs: any;

  @Emit("change")
  onChange(): ValueFieldStatus<boolean> {
    this.status.errors = Validator.checkFieldValidity(
      this.status.value,
      this.config.validators
    );
    this.status.isValid = this.status.errors.length == 0;    
    this.config.status = this.status;
    return this.status;
  }
}
</script>

<style scoped lang="scss">
</style>

<template>
  <div class="number-range">
    <label v-if="config.settings && config.settings.name" :for="config.key">{{config.settings.name}}</label>
    <input
      type="range"
      ref="input"
      :id="config.key"
      :placeholder="config.settings.placeholder"
      v-model.number="config.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{'show': config.status.showErrors, 'valid': config.status.isValid}"
      :min="config.settings.min"
      :max="config.settings.max"
      :step="config.settings.step"
    />
    {{config.status.value}}
    <span class="unit" v-if="!!config.settings.unit">{{config.settings.unit}}</span>
    <br>
    <div v-if="config.status.showErrors && config.status.errors && config.status.errors[0]">{{config.status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { NumberRangeConfig } from "./NumberRange.config";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.config";

@Component({
  name: 'NumberRange'
})
export default class NumberRange extends Vue {

  @Prop() private config!: NumberRangeConfig;
  @Prop() public status: ValueFieldStatus<number>;
  
  public $refs: any;

  mounted() {
    if ("default" in this.config.settings) {
      this.config.status.value = this.config.settings.default;
    } else {
      this.config.status.value = this.config.settings.min;
    }
    this.updateStatus();
  }
  setBlur() {
    this.config.status.showErrors = true;
    this.updateStatus();
  }
  @Emit("change")
  updateStatus(): ValueFieldStatus<number> {
    let errors = Validator.checkFieldValidity(this.config.status.value, this.config.validators);
    this.config.status.isValid = errors.length == 0;
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

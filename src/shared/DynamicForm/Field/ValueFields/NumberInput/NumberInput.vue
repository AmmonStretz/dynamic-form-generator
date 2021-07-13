<template>
  <div class="number-input">
    <label v-if="config.settings && config.settings.name" :for="config.key">{{config.settings.name}}:</label>
    <input
      v-if="config && config.status"
      type="number"
      ref="input"
      :id="config.key"
      :placeholder="config.settings.placeholder"
      v-model.number="config.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{'show': config.status.showErrors, 'valid': config.status.isValid}"
    />
    <span v-if="config.settings.unit">{{config.settings.unit}}</span><br>
    <div v-if="config.status.showErrors && config.status.errors && config.status.errors[0]">{{config.status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { NumberInputConfig } from "./NumberInput.config";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.config";

@Component({
  name: 'NumberInputComponent'
})
export default class NumberInputComponent extends Vue {
  @Prop() private config!: NumberInputConfig;
  @Prop() public status: ValueFieldStatus<number>;

  public $refs: any;

  mounted() {
    this.updateStatus();
  }

  setBlur() {
    this.config.status.showErrors = true;
    this.updateStatus();
  }
  @Emit("change")
  updateStatus(): ValueFieldStatus<number> {
    // TODO: REMAPPING WITH MATH_OBJECT
    if(this.config.settings.min != null && this.config.settings.min != undefined){
      this.config.status.value = Math.max(this.config.settings.min, this.config.status.value)
    } 
    if(this.config.settings.max != null && this.config.settings.max != undefined) {
      this.config.status.value = Math.min(this.config.status.value, this.config.settings.max)
    }
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

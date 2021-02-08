<template>
  <div class="number-input">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{dto.config.name}}</label>
    <input
      v-if="status"
      type="number"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model.number="status.value"
      @focus="setFocus()"
      @blur="setBlur()"
      :class="{'show': status.showErrors, 'valid': status.isValid}"
    />
    <span v-if="dto.config.unit">{{dto.config.unit}}</span><br>
    <div v-if="status.showErrors && status.errors && status.errors[0]">{{status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { NumberInput } from "./NumberInput.dto";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.dto";

@Component({
  name: 'NumberInputComponent'
})
export default class NumberInputComponent extends Vue {
  @Prop() private dto!: NumberInput;

  @Prop()
  public status: ValueFieldStatus<number>;
  public $refs: any;

  mounted() {
    this.updateStatus();
  }

  setFocus() {
    this.status.showErrors = false;
    this.updateStatus();
  }

  setBlur() {    
    this.status.showErrors = true;
    this.updateStatus();
  }

  @Emit("change")
  updateStatus(): ValueFieldStatus<number> {
    // TODO: REMAPPING WITH MATH_OBJECT
    if(this.dto.config.min != null && this.dto.config.min != undefined){
      this.dto.status.value = Math.max(this.dto.config.min, this.dto.status.value)
    } 
    if(this.dto.config.max != null && this.dto.config.max != undefined) {
      this.dto.status.value = Math.min(this.dto.status.value, this.dto.config.max)
    }
    this.status.errors = Validator.checkFieldValidity(this.status.value, this.dto.validators);
    this.status.isValid = this.status.errors.length == 0;
    return this.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>

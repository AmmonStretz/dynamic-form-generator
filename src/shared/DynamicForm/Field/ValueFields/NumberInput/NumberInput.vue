<template>
  <div class="number-input">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{dto.config.name}}</label>
    <input
      v-if="dto && dto.status"
      type="number"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model.number="dto.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{'show': dto.status.showErrors, 'valid': dto.status.isValid}"
    />
    <span v-if="dto.config.unit">{{dto.config.unit}}</span><br>
    <div v-if="dto.status.showErrors && dto.status.errors && dto.status.errors[0]">{{dto.status.errors[0].message}}</div>
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

  public $refs: any;

  mounted() {
    this.updateStatus();
  }

  setBlur() {
    this.dto.status.showErrors = true;
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
    this.dto.status.errors = Validator.checkFieldValidity(this.dto.status.value, this.dto.validators);
    this.dto.status.isValid = this.dto.status.errors.length == 0;
    return this.dto.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>

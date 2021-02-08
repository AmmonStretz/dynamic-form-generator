<template>
  <div class="number-range">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{dto.config.name}}</label>
    <input
      type="range"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model.number="dto.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{'show': dto.status.showErrors, 'valid': dto.status.isValid}"
      :min="dto.config.min"
      :max="dto.config.max"
      :step="dto.config.step"
    />
    {{dto.status.value}}
    <span class="unit" v-if="!!dto.config.unit">{{dto.config.unit}}</span>
    <br>
    <div v-if="dto.status.showErrors && dto.status.errors && dto.status.errors[0]">{{dto.status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { NumberRange } from "./NumberRange.dto";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.dto";

@Component({
  name: 'NumberRangeComponent'
})
export default class NumberRangeComponent extends Vue {

  @Prop() private dto!: NumberRange;
  
  public $refs: any;

  mounted() {
    if ("default" in this.dto.config) {
      this.dto.status.value = this.dto.config.default;
    } else {
      this.dto.status.value = this.dto.config.min;
    }
    this.updateStatus();
  }
  setBlur() {
    this.dto.status.showErrors = true;
    this.updateStatus();
  }
  @Emit("change")
  updateStatus(): ValueFieldStatus<number> {
    let errors = Validator.checkFieldValidity(this.dto.status.value, this.dto.validators);
    this.dto.status.isValid = errors.length == 0;
    return this.dto.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>

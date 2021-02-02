<template>
  <div class="number-range">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{dto.config.name}}</label>
    <input
      type="range"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model.number="status.value"
      @focus="setFocus()"
      @blur="setBlur()"
      :class="{'show': status.show, 'valid': status.isValid}"
      :min="dto.config.min"
      :max="dto.config.max"
      :step="dto.config.step"
    />
    {{status.value}}
    <span class="unit" v-if="!!dto.config.unit">{{dto.config.unit}}</span>
    <br>
    <div v-if="status.show && status.errors && status.errors[0]">{{status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { NumberRange } from "./NumberRange.dto";
import { Validator } from "../../Validators/validators.class";
import { FieldStatus } from "../Field.dto";

@Component({
  name: 'NumberRangeComponent'
})
export default class NumberRangeComponent extends Vue {

  @Prop() private dto!: NumberRange;
  
  @Prop()
  public status!: FieldStatus<number>;
  public $refs: any;

  mounted() {
    if ("default" in this.dto.config) {
      this.status.value = this.dto.config.default;
    } else {
      this.status.value = this.dto.config.min;
    }
    this.updateStatus();
  }
  setFocus() {
    this.status.show = false;
    this.updateStatus();
  }

  setBlur() {    
    this.status.show = true;
    this.updateStatus();
  }

  @Emit("change")
  updateStatus(): FieldStatus<number> {
    let errors = Validator.checkFieldValidity(this.status.value, this.dto.validators);
    this.status.isValid = errors.length == 0;
    return this.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>

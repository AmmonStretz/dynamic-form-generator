<template>
  <div class="checkbox">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{
      dto.config.name
    }}</label>
    <input
      v-if="status"
      type="checkbox"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model.number="status.value"
      @focus="setFocus()"
      @blur="setBlur()"
      :class="{ show: status.show, valid: status.isValid }"
    /><br>
    <div v-if="status.show && status.errors && status.errors[0]">{{status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Checkbox } from "./Checkbox.dto";
import { Validator } from "../../Validators/validators.class";
import { FieldStatus } from "../Field.dto";

@Component({
  name: "CheckboxComponent",
})
export default class CheckboxComponent extends Vue {
  @Prop() private dto!: Checkbox;

  @Prop()
  public status: FieldStatus<boolean>;

  public value: boolean = false;
  public show: boolean = false;
  public valid: boolean = false;
  public $refs: any;

  setFocus() {
    this.status.show = false;
    this.updateStatus();
  }

  setBlur() {    
    this.status.show = true;
    this.updateStatus();
  }

  @Emit("change")
  updateStatus(): FieldStatus<boolean> {
    this.status.errors = Validator.checkFieldValidity(
      this.value,
      this.dto.validators
    );
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

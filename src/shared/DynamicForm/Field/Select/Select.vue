<template>
  <div class="number-input">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{
      dto.config.name
    }}</label>
    <!-- <input
      v-if="status"
      type="number"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model.number="status.value"
      @focus="setFocus()"
      @blur="setBlur()"
      :class="{'show': status.show, 'valid': status.isValid}"
    /> -->
    <select
      v-if="status"
      :id="dto.key"
      v-model.number="status.value"
      @focus="setFocus()"
      @blur="setBlur()"
      :class="{ show: status.showErrors, valid: status.isValid }"
    >
      <option
        v-for="(option, index) of dto.options"
        :key="index"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select><br>
    <div v-if="status.showErrors && status.errors && status.errors[0]">{{status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Select } from "./Select.dto";
import { Validator } from "../../Validators/validators.class";
import { FieldStatus } from "../Field.dto";

@Component({
  name: "SelectComponent",
})
export default class SelectComponent extends Vue {
  @Prop() private dto!: Select;
  
  @Prop()
  public status!: FieldStatus<number>;
  public $refs: any;

  mounted() {
    this.status.key = this.dto.key;
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
  updateStatus(): FieldStatus<number> {
    this.status.errors = Validator.checkFieldValidity(
      this.status.value,
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

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
      @change="updateStatus()"
      :class="{ show: status.showErrors, valid: status.isValid }"
    /><br>
    <!-- TODO: instant update -->
    <!-- <div @click="status.value=true;updateStatus()">TRUE</div>
    <div @click="status.value=false;updateStatus()">FALSE</div> -->
    <div v-if="status.showErrors && status.errors && status.errors[0]">{{status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Checkbox } from "./Checkbox.dto";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.dto";

@Component({
  name: "CheckboxComponent",
})
export default class CheckboxComponent extends Vue {
  @Prop() private dto!: Checkbox;

  @Prop()
  public status: ValueFieldStatus<boolean>;
  public $refs: any;

  mounted() {
    this.updateStatus();
  }

  // setFocus() {
  //   this.status.showErrors = false;
  //   this.updateStatus();
  // }

  // setBlur() {    
  //   this.status.showErrors = true;
  //   this.updateStatus();
  // }

  @Emit("change")
  updateStatus(): ValueFieldStatus<boolean> {
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

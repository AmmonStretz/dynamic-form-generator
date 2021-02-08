<template>
  <div class="checkbox">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{
      dto.config.name
    }}</label>
    <input
      v-if="dto.status"
      type="checkbox"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model.number="dto.status.value"
      @change="updateStatus()"
      :class="{ show: dto.status.showErrors, valid: dto.status.isValid }"
    /><br>
    <div v-if="dto.status.showErrors && dto.status.errors && dto.status.errors[0]">{{dto.status.errors[0].message}}</div>
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
  public $refs: any;

  mounted() {
    this.updateStatus();
  }

  @Emit("change")
  updateStatus(): ValueFieldStatus<boolean> {
    this.dto.status.errors = Validator.checkFieldValidity(
      this.dto.status.value,
      this.dto.validators
    );
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

<template>
  <div class="number-input">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{
      dto.config.name
    }}</label>
    <select
      v-if="dto && dto.status"
      :id="dto.key"
      v-model.number="dto.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{ show: dto.status.showErrors, valid: dto.status.isValid }"
    >
      <option
        v-for="(option, index) of dto.options"
        :key="index"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select><br>
    <div v-if="dto.status.showErrors && dto.status.errors && dto.status.errors[0]">{{dto.status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Select } from "./Select.dto";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.dto";

@Component({
  name: "SelectComponent",
})
export default class SelectComponent extends Vue {
  @Prop() private dto!: Select;
  
  public $refs: any;

  mounted() {
    this.dto.status.key = this.dto.key;
    this.updateStatus();
  }

  setBlur() {
    this.dto.status.showErrors = true;
    this.updateStatus();
  }

  @Emit("change")
  updateStatus(): ValueFieldStatus<number> {
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

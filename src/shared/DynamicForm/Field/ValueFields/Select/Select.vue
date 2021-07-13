<template>
  <div class="number-input">
    <label v-if="config.settings && config.settings.name" :for="config.key">
      {{ config.settings.name }}
    </label>
    <select
      v-if="config && config.status"
      :id="config.key"
      v-model.number="config.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{ show: config.status.showErrors, valid: config.status.isValid }"
    >
      <option
        v-for="(option, index) of config.options"
        :key="index"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select><br />
    <div v-if="config.status.showErrors && config.status.errors && config.status.errors[0]">{{config.status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { SelectConfig } from "./Select.config";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.config";

@Component({
  name: "Select",
})
export default class Select extends Vue {
  @Prop() private config!: SelectConfig;
  @Prop() public status: ValueFieldStatus<number>;

  public $refs: any;

  setBlur() {
    this.config.status.showErrors = true;
    this.updateStatus();
  }

  @Emit("change")
  updateStatus(): ValueFieldStatus<number> {
    this.config.status.errors = Validator.checkFieldValidity(
      this.config.status.value,
      this.config.validators
    );
    this.config.status.isValid = this.config.status.errors.length == 0;
    this.status = this.config.status;
    return this.config.status;
  }
}
</script>

<style scoped lang="scss">
select.show:not(.valid) {
  background-color: red;
}
</style>

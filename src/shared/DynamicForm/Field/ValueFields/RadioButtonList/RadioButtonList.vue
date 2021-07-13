<template>
  <div class="number-input">
    <label v-if="config.settings && config.settings.name" :for="config.key">
      {{ config.settings.name }}
    </label>
    <div v-for="(option, index) of config.options" :key="'i' + index">
      <input
        type="radio"
        :id="_uid + option.value"
        v-model.number="config.status.value"
        :value="option.value"
        @change="updateStatus()"
      />
      <label :for="_uid + option.value">{{ option.name }}</label
      ><br />
    </div>
    <div
      v-if="config.status.showErrors && config.status.errors && config.status.errors[0]"
    >
      {{ config.status.errors[0].message }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { RadioButtonListConfig } from "./RadioButtonList.config";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.config";

@Component({
  name: "RadioButtonList",
})
export default class RadioButtonList extends Vue {
  @Prop() private config!: RadioButtonListConfig;
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
input.show:not(.valid) {
  background-color: red;
}
</style>

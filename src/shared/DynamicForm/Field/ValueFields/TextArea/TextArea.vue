<template>
  <div class="text-area">
    <label v-if="config.settings && config.settings.name" :for="config.key">{{
      config.settings.name
    }}</label>
    {{config.settings.placeholder}}
    <textarea
      v-if="config.status"
      ref="input"
      :id="config.key"
      :placeholder="config.settings.placeholder"
      v-model="config.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{ show: config.status.showErrors, valid: config.status.isValid }"
    />
    <span v-if="config.settings.unit">{{ config.settings.unit }}</span
    ><br />
    <div
      class="error-message"
      v-if="config.status.showErrors && config.status.errors && config.status.errors[0]"
    >
      {{ config.status.errors[0].message }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { TextAreaConfig } from "./TextArea.config";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.config";

@Component({
  name: "TextArea",
})
export default class TextArea extends Vue {
  @Prop() private config!: TextAreaConfig;
  @Prop() public status: ValueFieldStatus<string>;
  public $refs: any;

  setBlur() {
    this.config.status.showErrors = true;
    this.updateStatus();
  }

  @Emit("change")
  updateStatus(): ValueFieldStatus<string> {
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
</style>

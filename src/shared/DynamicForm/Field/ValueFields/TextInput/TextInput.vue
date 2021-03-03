<template>
  <div class="text-input">
    <label v-if="config.settings && config.settings.name" :for="config.key">{{
      config.settings.name
    }}</label>
    <input
      v-if="config.status"
      :type="textType"
      ref="input"
      :id="config.key"
      :placeholder="config.settings.placeholder"
      v-model="config.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{ show: config.status.showErrors, valid: config.status.isValid }"
    />
    <textarea
      v-if="config.status && config.settings.textType == 'textarea'"
      :type="config.settings.textType"
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
      v-if="config.status.showErrors && config.status.errors && config.status.errors[0]"
    >
      {{ config.status.errors[0].message }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { TextInputConfig } from "./TextInput.config";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.config";

@Component({
  name: "TextInputComponent",
})
export default class TextInputComponent extends Vue {
  @Prop() private config!: TextInputConfig;
  public $refs: any;

  mounted() {
    this.updateStatus();
  }

  setBlur() {
    this.config.status.showErrors = true;
    this.updateStatus();
  }

  get textType() {
    return !this.config.validators.find((validator) => validator.type == "isEmail")
      ? "text"
      : "email";
  }

  @Emit("change")
  updateStatus(): ValueFieldStatus<string> {
    this.config.status.errors = Validator.checkFieldValidity(
      this.config.status.value,
      this.config.validators
    );
    this.config.status.isValid = this.config.status.errors.length == 0;
    return this.config.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>

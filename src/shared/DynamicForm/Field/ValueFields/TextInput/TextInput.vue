<template>
  <div class="text-input">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{
      dto.config.name
    }}</label>
    <input
      v-if="dto.status"
      :type="textType"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model="dto.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{ show: dto.status.showErrors, valid: dto.status.isValid }"
    />
    <textarea
      v-if="dto.status && dto.config.textType == 'textarea'"
      :type="dto.config.textType"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model="dto.status.value"
      @focus="updateStatus()"
      @blur="setBlur()"
      :class="{ show: dto.status.showErrors, valid: dto.status.isValid }"
    />
    <span v-if="dto.config.unit">{{ dto.config.unit }}</span
    ><br />
    <div
      v-if="dto.status.showErrors && dto.status.errors && dto.status.errors[0]"
    >
      {{ dto.status.errors[0].message }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { TextInput } from "./TextInput.dto";
import { Validator } from "../../../Validators/validators.class";
import { ValueFieldStatus } from "../ValueField.dto";

@Component({
  name: "TextInputComponent",
})
export default class TextInputComponent extends Vue {
  @Prop() private dto!: TextInput;
  public $refs: any;

  mounted() {
    this.updateStatus();
  }

  setBlur() {
    this.dto.status.showErrors = true;
    this.updateStatus();
  }

  get textType() {
    return !this.dto.validators.find((validator) => validator.type == "isEmail")
      ? "text"
      : "email";
  }

  @Emit("change")
  updateStatus(): ValueFieldStatus<string> {
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

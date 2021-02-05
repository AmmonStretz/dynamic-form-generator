<template>
  <div class="text-input">
    <label v-if="dto.config && dto.config.name" :for="dto.key">{{dto.config.name}}</label>
    <input
      v-if="status"
      type="text"
      ref="input"
      :id="dto.key"
      :placeholder="dto.config.placeholder"
      v-model="status.value"
      @focus="setFocus()"
      @blur="setBlur()"
      :class="{'show': status.showErrors, 'valid': status.isValid}"
    />
    <span v-if="dto.config.unit">{{dto.config.unit}}</span><br>
    <div v-if="status.showErrors && status.errors && status.errors[0]">{{status.errors[0].message}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { TextInput } from "./TextInput.dto";
import { Validator } from "../../Validators/validators.class";
import { ValueFieldStatus } from '../Field.dto';

@Component({
  name: 'TextInputComponent'
})
export default class TextInputComponent extends Vue {
  @Prop() private dto!: TextInput;

  @Prop()
  public status: ValueFieldStatus<string>;
  public $refs: any;

  mounted() {
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
  updateStatus(): ValueFieldStatus<string> {
    this.status.errors = Validator.checkFieldValidity(this.status.value, this.dto.validators);
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

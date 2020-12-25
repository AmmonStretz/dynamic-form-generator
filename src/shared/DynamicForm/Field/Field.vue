<template>
  <div class="field">
    <NumberInputComponent
      v-if="dto.type == 'numberInput'"
      v-bind:dto="dto"
      v-bind:service="service"
      v-on:change="onChange"
    ></NumberInputComponent>
    <NumberRangeComponent
      v-if="dto.type == 'numberRange'"
      v-bind:dto="dto"
      v-bind:service="service"
      v-on:change="onChange"
    ></NumberRangeComponent>
    <CheckboxComponent
      v-if="dto.type == 'checkbox'"
      v-bind:dto="dto"
      v-bind:service="service"
      v-on:change="onChange"
    ></CheckboxComponent>
    <FieldGroupComponent
      v-if="dto.type == 'fieldGroup'"
      v-bind:dto="dto"
      v-bind:service="service"
      v-on:change="onChange"
    ></FieldGroupComponent>
    <TextFieldComponent
      v-if="dto.type == 'textField'"
      v-bind:dto="dto"
    ></TextFieldComponent>
    <p class="error" v-if="message">Error: {{ message }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Validator } from "../Validators/validators.class";
import NumberInputComponent from "./NumberInput/NumberInput.vue";
import NumberRangeComponent from "./NumberRange/NumberRange.vue";
import CheckboxComponent from "./Checkbox/Checkbox.vue";
import FieldGroupComponent from "./FieldGroup/FieldGroup.vue";
import TextFieldComponent from "./TextField/TextField.vue";
import { Field, FieldStatus } from "./Field.dto";
import { FormService } from "../services/Form.service";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {
    NumberInputComponent,
    TextFieldComponent,
    NumberRangeComponent,
    CheckboxComponent,
    FieldGroupComponent,
  },
})
export default class FieldComponent extends Vue {
  @Prop() private dto!: Field;
  @Prop() public service!: FormService;

  public message: string = "";

  @Emit("change")
  onChange(status: FieldStatus<any>) {    
    this.message = !status.isValid && status.show ? status.errors[0].message : "";
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>

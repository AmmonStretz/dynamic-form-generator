<template>
  <div class="field">
    <NumberInputComponent
      v-if="dto.type == 'numberInput'"
      v-bind:dto="dto"
      v-bind:status="status"
      v-on:change="onChange"
    ></NumberInputComponent>
    <NumberRangeComponent
      v-if="dto.type == 'numberRange'"
      v-bind:dto="dto"
      v-bind:status="status"
      v-on:change="onChange"
    ></NumberRangeComponent>
    <CheckboxComponent
      v-if="dto.type == 'checkbox'"
      v-bind:dto="dto"
      v-bind:status="status"
      v-on:change="onChange"
    ></CheckboxComponent>
    <FieldGroupComponent
      v-if="dto.type == 'fieldGroup'"
      v-bind:dto="dto"
      v-bind:status="status"
      v-on:change="onChange"
    ></FieldGroupComponent>
    <TextFieldComponent
      v-if="dto.type == 'textField'"
      v-bind:dto="dto"
    ></TextFieldComponent>
    <SelectComponent
      v-if="dto.type == 'select'"
      v-bind:dto="dto"
      v-bind:status="status"
      v-on:change="onChange"
    ></SelectComponent>
    <p if="dto.config.description">{{ dto.config.description }}</p>
    <!-- {{status}} -->
    <!-- <p class="error" v-if="!status.isValid && status.show">Error: {{ errorMessage }}</p> -->
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
import SelectComponent from "./Select/Select.vue";
import { Field, FieldStatus, ValueField } from "./Field.dto";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {
    NumberInputComponent,
    TextFieldComponent,
    NumberRangeComponent,
    CheckboxComponent,
    FieldGroupComponent,
    SelectComponent,
  },
})
export default class FieldComponent extends Vue {
  @Prop() private dto!: Field;

  @Prop()
  public status: FieldStatus<any>;
  // {
  //   key: this.dto instanceof ValueField? this.dto.key: null,
  //   value: null,
  //   show: false
  // }

  // public message: string = "";

  // get errorMessage(): string {
  //   return !this.status.isValid && this.status.show ? this.status.errors[0].message : "";
  // }

  @Emit("change")
  onChange(status: FieldStatus<any>): FieldStatus<any> {
    this.$forceUpdate();
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>

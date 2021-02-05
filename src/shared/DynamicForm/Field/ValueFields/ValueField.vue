<template>
  <div class="value-field">
    <NumberInputComponent
      v-if="dto.type == 'numberInput'"
      v-bind:dto="dto"
      v-bind:status="status"
      v-on:change="onChange"
    ></NumberInputComponent>
    <TextInputComponent
      v-if="dto.type == 'textInput'"
      v-bind:dto="dto"
      v-bind:status="status"
      v-on:change="onChange"
    ></TextInputComponent>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import NumberInputComponent from "./NumberInput/NumberInput.vue";
import TextInputComponent from "./TextInput/TextInput.vue";
import NumberRangeComponent from "./NumberRange/NumberRange.vue";
import CheckboxComponent from "./Checkbox/Checkbox.vue";
import TextFieldComponent from "./TextField/TextField.vue";
import SelectComponent from "./Select/Select.vue";
import { ValueFieldStatus, ValueField } from "../Field.dto";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {
    NumberInputComponent,
    TextInputComponent,
    TextFieldComponent,
    NumberRangeComponent,
    CheckboxComponent,
    SelectComponent,
  },
})
export default class FieldComponent extends Vue {
  @Prop() private dto!: ValueField<any>;

  @Prop()
  public status: ValueFieldStatus<any>;
  @Prop()
  public values!: {[key: string]: any};

  get visibility(): any {
    if(this.values, (this.dto.visible).calc && this.values){
      this.status.visible = this.dto.visible.calc(this.values);
      return this.status.visible
    }
    return true;
  }

  @Emit("change")
  onChange(status: ValueFieldStatus<any>): ValueFieldStatus<any> {
    this.$forceUpdate();
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>

<template>
  <div class="value-field">
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
    <p>{{visibility}}</p>
    <p if="dto.config.description">{{ dto.config.description }}</p>
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
import { Field, ValueFieldStatus, ValueField } from "./Field.dto";
import { WizzardStatus } from "../Wizzard/Wizzard.dto";
import { BooleanObject } from "../math-logic/math-object.class";
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
  public status: ValueFieldStatus<any>;
  @Prop()
  public values!: {[key: string]: any};
  // {
  //   key: this.dto instanceof ValueField? this.dto.key: null,
  //   value: null,
  //   show: false
  // }

  // public message: string = "";

  // get errorMessage(): string {
  //   return !this.status.isValid && this.status.show ? this.status.errors[0].message : "";
  // }
  private vis = true;
  get visibility(): any {
      console.log(this.dto.type, this.dto.visible);
    if(this.values, (this.dto.visible).calc && this.values){
      console.log('is given');
      
      return this.dto.visible.calc(this.values)
    }
    return this.vis;
  }

  // mounted() {
  //   (this as any).$store.dispatch("addListener", ()=>{
  //     console.log('test',(this as any).$store.state.status.calcValue('checkboxKey'));
  //   })
  // }

  @Emit("change")
  onChange(status: ValueFieldStatus<any>): ValueFieldStatus<any> {
    this.$forceUpdate();
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>

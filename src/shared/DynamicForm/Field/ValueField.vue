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
import { BooleanConst } from "../math-logic/objects/boolean/const";
import { BooleanVar } from "../math-logic/objects/boolean/var";
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

<template>
  <div class="value-field">
    <NumberInputComponent
      v-if="dto.type == 'numberInput'"
      v-bind:dto="dto"
      v-on:change="onChange"
    ></NumberInputComponent>
    <TextInputComponent
      v-if="dto.type == 'textInput'"
      v-bind:dto="dto"
      v-on:change="onChange"
    ></TextInputComponent>
    <TextAreaComponent
      v-if="dto.type == 'textArea'"
      v-bind:dto="dto"
      v-on:change="onChange"
    ></TextAreaComponent>
    <NumberRangeComponent
      v-if="dto.type == 'numberRange'"
      v-bind:dto="dto"
      v-on:change="onChange"
    ></NumberRangeComponent>
    <CheckboxComponent
      v-if="dto.type == 'checkbox'"
      v-bind:dto="dto"
      v-on:change="onChange"
    ></CheckboxComponent>
    <SelectComponent
      v-if="dto.type == 'select'"
      v-bind:dto="dto"
      v-on:change="onChange"
    ></SelectComponent>
    <RadioButtonListComponent
      v-if="dto.type == 'radioButtonList'"
      v-bind:dto="dto"
      v-on:change="onChange"
    ></RadioButtonListComponent>
    <p if="dto.config.description">{{ dto.config.description }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import NumberInputComponent from "./NumberInput/NumberInput.vue";
import TextInputComponent from "./TextInput/TextInput.vue";
import TextAreaComponent from "./TextArea/TextArea.vue";
import NumberRangeComponent from "./NumberRange/NumberRange.vue";
import CheckboxComponent from "./Checkbox/Checkbox.vue";
import SelectComponent from "./Select/Select.vue";
import RadioButtonListComponent from "./RadioButtonList/RadioButtonList.vue";
import { ValueFieldStatus, ValueField } from "./ValueField.dto";
import { Wizzard } from "../../Wizzard/Wizzard.dto";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {
    NumberInputComponent,
    TextInputComponent,
    TextAreaComponent,
    NumberRangeComponent,
    CheckboxComponent,
    SelectComponent,
    RadioButtonListComponent,
  },
})
export default class FieldComponent extends Vue {
  @Prop() private dto!: ValueField<any>;
  @Prop() public root!: Wizzard;

  get visibility(): any {
    if((this.dto.visible).calc){
      this.dto.status.isVisible = this.dto.visible.calc(
        (key) => this.root.getValueByKey(key)
      );
      return this.dto.status.isVisible
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

<template>
  <div class="value-field">
    <NumberInputComponent
      v-if="config.type == 'numberInput'"
      v-bind:config="config"
      v-on:change="onChange"
    ></NumberInputComponent>
    <TextInputComponent
      v-if="config.type == 'textInput'"
      v-bind:config="config"
      v-on:change="onChange"
    ></TextInputComponent>
    <TextAreaComponent
      v-if="config.type == 'textArea'"
      v-bind:config="config"
      v-on:change="onChange"
    ></TextAreaComponent>
    <NumberRangeComponent
      v-if="config.type == 'numberRange'"
      v-bind:config="config"
      v-on:change="onChange"
    ></NumberRangeComponent>
    <CheckboxComponent
      v-if="config.type == 'checkbox'"
      v-bind:config="config"
      v-on:change="onChange"
    ></CheckboxComponent>
    <SelectComponent
      v-if="config.type == 'select'"
      v-bind:config="config"
      v-on:change="onChange"
    ></SelectComponent>
    <RadioButtonListComponent
      v-if="config.type == 'radioButtonList'"
      v-bind:config="config"
      v-on:change="onChange"
    ></RadioButtonListComponent>
    <p if="config.settings.description">{{ config.settings.description }}</p>
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
import { ValueFieldStatus, ValueField } from "./ValueField.config";
import { Wizzard } from "../../Wizzard/Wizzard.config";
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
  @Prop() private config!: ValueField<any>;
  @Prop() public root!: Wizzard;

  get visibility(): any {
    if((this.config.visible).calc){
      this.config.status.isVisible = this.config.visible.calc(
        (key) => this.config.getValueByKey(key)
      );
      return this.config.status.isVisible
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

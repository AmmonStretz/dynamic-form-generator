<template>
  <form class="form">
    <h2 v-if="!!dto.config && !!dto.config.title">{{ dto.config.title }}</h2>
    <FieldComponent
      v-for="(field, index) in dto.fields"
      :key="index"
      v-bind:dto="field"
      v-bind:service="service"
      v-on:change="onChange"
    ></FieldComponent>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import FieldComponent from "../Field/Field.vue";
import { Form, FormStatus } from "./Form.dto";
import { FormService } from "../services/Form.service";
import { FieldStatus } from '../Field/Field.dto';

@Component({
  components: {
    FieldComponent,
  },
})
export default class FormComponent extends Vue {
  @Prop() public dto!: Form;

  public status: FormStatus = {values: {}};
  @Prop() public service!: FormService;

  @Emit("change")
  onChange(status: FieldStatus<any>) {
    this.status.values[status.key] = status;
    this.status.isValide = this.checkValidity();
    return this.status;
  }

  checkValidity(): boolean {
    for (const key in this.status.values) {
      if (!this.status.values[key].isValid) {
        return false;
      }
    }
    return true;
  }
}
</script>

<style scoped lang="scss">
</style>

<template>
  <form class="form" v-if="status && dto">
    <h2 v-if="!!dto.config && !!dto.config.title">{{ dto.config.title }}</h2>
    <FieldComponent
      v-for="(field, index) in dto.fields"
      :key="index"
      v-bind:dto="field"
      v-bind:status="status.fields[dto.fields[index].key]"
      v-on:change="onChange"
    ></FieldComponent>
    <p if="dto.config.description">{{dto.config.description}}</p>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import FieldComponent from "../Field/Field.vue";
import { Form, FormStatus } from "./Form.dto";
import { FieldStatus } from '../Field/Field.dto';

@Component({
  components: {
    FieldComponent,
  },
})
export default class FormComponent extends Vue {
  @Prop() public dto!: Form;

  @Prop()
  public status: FormStatus;

  @Emit("change")
  onChange(status: FieldStatus<any>): FormStatus {

    this.status.fields[status.key] = status;
    this.status.isValid = this.checkValidity();
    return this.status;
  }

  checkValidity(): boolean {
    for (const key in this.status.fields) {
      if (!this.status.fields[key].isValid) {
        return false;
      }
    }
    return true;
  }
}
</script>

<style scoped lang="scss">
</style>

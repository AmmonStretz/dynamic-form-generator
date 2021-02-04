<template>
  <div class="field">
    <ValueFieldComponent
      v-if="dto.type != 'fieldGroup'"
      v-bind:dto="dto"
      v-bind:status="status"
      v-bind:values="values"
      v-on:change="onChange"
    ></ValueFieldComponent>
    <FieldGroupComponent
      v-if="dto.type == 'fieldGroup'"
      v-bind:dto="dto"
      v-bind:status="status"
      v-bind:values="values"
      v-on:change="onChange"
    ></FieldGroupComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import FieldGroupComponent from "./FieldGroup/FieldGroup.vue";
import ValueFieldComponent from "./ValueField.vue";
import { Field, ValueFieldStatus, ValueField, FieldStatus } from "./Field.dto";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {
    ValueFieldComponent,
    FieldGroupComponent,
  },
})
export default class FieldComponent extends Vue {
  @Prop() private dto!: Field;

  @Prop()
  public status: FieldStatus;
  @Prop()
  public values!: {[key: string]: any};

  @Emit("change")
  onChange(status: ValueFieldStatus<any>): ValueFieldStatus<any> {
    this.$forceUpdate();
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>

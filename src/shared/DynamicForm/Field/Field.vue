<template>
  <div class="field" v-if="visibility">
    <ValueFieldComponent
      v-if="dto.type != 'fieldGroup' && dto.type != 'fieldLoop'"
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
import ValueFieldComponent from "./ValueFields/ValueField.vue";
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
  public values!: { [key: string]: any };

  get visibility(): any {
    if (this.dto.visible.calc && this.values) {
      this.status.visible = this.dto.visible.calc(this.values);
      return this.status.visible;
    }
    return true;
  }

  @Emit("change")
  onChange(status: ValueFieldStatus<any>): ValueFieldStatus<any> {
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>

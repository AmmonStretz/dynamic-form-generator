<template>
  <div class="field" v-if="visibility">
    <ValueFieldComponent
      v-if="dto.type != 'fieldGroup' && dto.type != 'fieldLoop'"
      v-bind:dto="dto"
      v-bind:root="root"
      v-on:change="onChange"
    ></ValueFieldComponent>
    <FieldGroupComponent
      v-if="dto.type == 'fieldGroup'"
      v-bind:dto="dto"
      v-bind:root="root"
      v-on:change="onChange"
    ></FieldGroupComponent>
    <FieldLoopComponent
      v-if="dto.type == 'fieldLoop'"
      v-bind:dto="dto"
      v-bind:status="status"
      v-bind:root="root"
      v-on:change="onChange"
    ></FieldLoopComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import FieldGroupComponent from "./FieldGroup/FieldGroup.vue";
import ValueFieldComponent from "./ValueFields/ValueField.vue";
import { Field, FieldStatus } from "./Field.dto";
import FieldLoopComponent from "./FieldLoop/FieldLoop.vue";
import { Wizzard } from "../Wizzard/Wizzard.dto";
import { ValueFieldStatus } from "./ValueFields/ValueField.dto";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {
    ValueFieldComponent,
    FieldGroupComponent,
    FieldLoopComponent,
  },
})
export default class FieldComponent extends Vue {
  @Prop() private dto!: Field;

  @Prop()
  public status: FieldStatus;
  @Prop() public root!: Wizzard;

  get visibility(): any {
    if (this.dto.visible.calc) {
      this.status.isVisible = this.dto.visible.calc(
        (key) => this.root.getStatusByKey(key)
      );      
      return this.status.isVisible;
    }
    return true;
  }

  @Emit("change")
  onChange(status: FieldStatus): FieldStatus {
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>

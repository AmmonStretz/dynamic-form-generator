<template>
  <div class="field" v-if="visibility">
    <ValueFieldComponent
      v-if="isValueField"
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
      v-bind:root="root"
      v-on:change="onChange"
    ></FieldLoopComponent>
    <FieldLoopComponent
      v-if="dto.type == 'fieldLoop'"
      v-bind:dto="dto"
      v-bind:root="root"
      v-on:change="onChange"
    ></FieldLoopComponent>
    <ContentFieldComponent
      v-if="isContentField"
      v-bind:dto="dto"
      v-bind:root="root"
    >
    </ContentFieldComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import FieldGroupComponent from "./FieldGroup/FieldGroup.vue";
import ValueFieldComponent from "./ValueFields/ValueField.vue";
import ContentFieldComponent from "./ContentFields/ContentField.vue";
import { Field, FieldStatus } from "./Field.dto";
import FieldLoopComponent from "./FieldLoop/FieldLoop.vue";
import { Wizzard } from "../Wizzard/Wizzard.dto";
// Vue.component('FieldComponent')
@Component({
  name: "FieldComponent",
  components: {
    ValueFieldComponent,
    FieldGroupComponent,
    FieldLoopComponent,
    ContentFieldComponent,
  },
})
export default class FieldComponent extends Vue {
  @Prop() private dto!: Field;

  @Prop() public root!: Wizzard;

  get visibility(): any {
    if (this.dto.visible.calc) {
      this.dto.status.isVisible = this.dto.visible.calc((key) =>
        this.root.getValueByKey(key)
      );
      return this.dto.status.isVisible;
    }
    return true;
  }

  get isContentField() {
    return ['paragraph', 'hyperlink'].indexOf(this.dto.type)>=0;
  }
  get isValueField() {
    return !(['paragraph', 'hyperlink', 'fieldGroup', 'fieldLoop'].indexOf(this.dto.type)>=0);
  }

  @Emit("change")
  onChange(status: FieldStatus): FieldStatus {
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>

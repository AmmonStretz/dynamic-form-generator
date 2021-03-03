<template>
  <div class="field" v-if="visibility">
    <ValueFieldComponent
      v-if="isValueField"
      v-bind:config="config"
      v-bind:root="root"
      v-on:change="onChange"
      ref="child"
    ></ValueFieldComponent>
    <FieldGroupComponent
      v-if="config.type == 'fieldGroup'"
      v-bind:config="config"
      v-bind:root="root"
      v-on:change="onChange"
      ref="child"
    ></FieldGroupComponent>
    <FieldLoopComponent
      v-if="config.type == 'fieldLoop'"
      v-bind:config="config"
      v-bind:root="root"
      v-on:change="onChange"
      ref="child"
    ></FieldLoopComponent>
    <FieldLoopComponent
      v-if="config.type == 'fieldLoop'"
      v-bind:config="config"
      v-bind:root="root"
      v-on:change="onChange"
      ref="child"
    ></FieldLoopComponent>
    <ContentFieldComponent
      v-if="isContentField"
      v-bind:config="config"
      v-bind:root="root"
      ref="child"
    >
    </ContentFieldComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import FieldGroupComponent from "./FieldGroup/FieldGroup.vue";
import ValueFieldComponent from "./ValueFields/ValueField.vue";
import ContentFieldComponent from "./ContentFields/ContentField.vue";
import { FieldConfig, FieldStatus } from "./Field.config";
import FieldLoopComponent from "./FieldLoop/FieldLoop.vue";
import { WizzardConfig } from "../Wizzard/Wizzard.config";
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
  @Prop() private config!: FieldConfig;

  @Prop() public root!: WizzardConfig;

  get visibility(): any {
    if (this.config.visible.calc) {
      this.config.status.isVisible = this.config.visible.calc((key) =>
        this.config.status.getValueByKey(key)
      );
      return this.config.status.isVisible;
    }
    return true;
  }

  get isContentField() {
    return ['paragraph', 'hyperlink'].indexOf(this.config.type)>=0;
  }
  get isValueField() {
    return !(['paragraph', 'hyperlink', 'fieldGroup', 'fieldLoop'].indexOf(this.config.type)>=0);
  }

  @Emit("change")
  onChange(status: FieldStatus): FieldStatus {
    return status;
  }
}
</script>

<style scoped lang="scss">
</style>

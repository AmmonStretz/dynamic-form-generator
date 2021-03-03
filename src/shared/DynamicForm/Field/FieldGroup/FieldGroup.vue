<template>
  <div class="field-group" :class="{ horizontal: config.settings.horizontal }">
    <h2 v-if="!!config.settings && !!config.settings.title">{{ config.settings.title }}</h2>
    <div class="content">
      <FieldComponent
        v-for="(field, index) in config.fields"
        :key="index"
        v-bind:config="field"
        v-bind:status="field.status"
        v-bind:root="root"
        v-on:change="onChange"
      ></FieldComponent>
    </div>
    <br />
    <p if="config.settings.description">{{ config.settings.description }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { WizzardConfig } from "../../Wizzard/Wizzard.config";
import { FieldGroupConfig, FieldGroupStatus } from "./FieldGroup.config";
// import FieldComponent from "../Field.vue";

// Vue.component('FieldGroupComponent')
@Component({
  name: "FieldGroupComponent",
  components: {
    // FieldComponent,
  },
})
export default class FieldGroupComponent extends Vue {
  @Prop() public config!: FieldGroupConfig;
  @Prop() public root!: WizzardConfig;

  constructor() {
    super();
  }

  @Emit("change")
  onChange(status: FieldGroupStatus): FieldGroupStatus {
    this.config.updateValidity();
    const index: number = this.config.fields.findIndex(field=>field.status.key == status.key);
    this.config.fields[index].status = status;
    this.config.status.isValid = this.checkValidity();
    return this.config.status;
  }

  checkValidity(): boolean {
    for (let i = 0; i < this.config.fields.length; i++) {
      const field = this.config.fields[i];
      if (field.status.isVisible && !field.status.isValid) {
        return false;
      }
    }
    return true;
  }

  beforeCreate() {
    if (this.$options.components)
      (this.$options.components.FieldComponent as any) = require("../Field.vue").default;
  }
}
</script>

<style scoped lang="scss">
.field-group {
  .content {
    display: flex;
    flex-direction: column;
  }
  &.horizontal {
    .content {
      flex-direction: row;
    }
  }
}
</style>

<template>
  <div class="field-group" :class="{ horizontal: config.settings.horizontal }">
    <h3 v-if="!!config.settings && !!config.settings.title">{{ config.settings.title }}</h3>
    <div class="content">
      <Field
        v-for="(field, index) in config.fields"
        :key="index"
        v-bind:config="field"
        v-bind:status="status.children[index]"
        v-bind:root="root"
        v-on:change="onChange"
      ></Field>
    </div>
    <br />
    <p if="config.settings.description">{{ config.settings.description }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { FinderConfig } from "../../Finder/Finder.config";
import { FieldGroupConfig, FieldGroupStatus } from "./FieldGroup.config";

@Component({
  name: "FieldGroup",
})
export default class FieldGroup extends Vue {
  @Prop() public config!: FieldGroupConfig;
  @Prop() public status!: FieldGroupStatus;
  @Prop() public root!: FinderConfig;

  @Emit("change")
  onChange(status: FieldGroupStatus): FieldGroupStatus {
    this.config.status.update();
    const index: number = this.config.fields.findIndex(field=>field.status.key == status.key);
    this.config.fields[index].status = status;
    this.config.status.isValid = this.checkValidity();
    return this.config.status;
  }

  checkValidity(): boolean {
    for (let i = 0; i < this.config.fields.length; i++) {
      const field = this.config.fields[i];
      if (field.status.visible && !field.status.isValid) {
        return false;
      }
    }
    return true;
  }

  beforeCreate() {
    if (this.$options.components)
      (this.$options.components.Field as any) = require("../Field.vue").default;
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

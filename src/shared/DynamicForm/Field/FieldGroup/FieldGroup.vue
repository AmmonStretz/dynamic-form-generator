<template>
  <div class="field-group" :class="{ horizontal: dto.config.horizontal }">
    <h2 v-if="!!dto.config && !!dto.config.title">{{ dto.config.title }}</h2>
    <div class="content">
      <FieldComponent
        v-for="(field, index) in dto.fields"
        :key="index"
        v-bind:dto="field"
        v-bind:status="field.status"
        v-bind:root="root"
        v-on:change="onChange"
      ></FieldComponent>
    </div>
    <br />
    <p if="dto.config.description">{{ dto.config.description }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Wizzard } from "../../Wizzard/Wizzard.dto";
import { FieldGroup, FieldGroupStatus } from "./FieldGroup.dto";
// import FieldComponent from "../Field.vue";

// Vue.component('FieldGroupComponent')
@Component({
  name: "FieldGroupComponent",
  components: {
    // FieldComponent,
  },
})
export default class FieldGroupComponent extends Vue {
  @Prop() public dto!: FieldGroup;
  @Prop() public root!: Wizzard;

  constructor() {
    super();
  }

  @Emit("change")
  onChange(status: FieldGroupStatus): FieldGroupStatus {
    this.dto.updateValidity();
    const index: number = this.dto.fields.findIndex(field=>field.status.key == status.key);
    this.dto.fields[index].status = status;
    this.dto.status.isValid = this.checkValidity();
    return this.dto.status;
  }

  checkValidity(): boolean {
    for (let i = 0; i < this.dto.fields.length; i++) {
      const field = this.dto.fields[i];
      if (field.status.isVisible && !field.status.isValid) {
        return false;
      }
    }
    return true;
  }

  beforeCreate() {
    if (this.$options.components)
      this.$options.components.FieldComponent = require("../Field.vue").default;
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

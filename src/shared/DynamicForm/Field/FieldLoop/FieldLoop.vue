<template>
  <div class="field-group" :class="{ horizontal: dto.config.horizontal }">
    <h2 v-if="!!dto.config && !!dto.config.title">{{ dto.config.title }}</h2>
    <div class="content">
      <FieldComponent
        v-for="(field, index) in dto.fields"
        :key="index"
        v-bind:dto="field"
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
import { FieldLoop, FieldLoopStatus } from "./FieldLoop.dto";
// import FieldComponent from "../Field.vue";

// Vue.component('FieldLoopComponent')
@Component({
  name: "FieldLoopComponent",
  components: {
    // FieldComponent,
  },
})
export default class FieldLoopComponent extends Vue {
  @Prop() public dto!: FieldLoop;
  @Prop() public root!: Wizzard;

  constructor() {
    super();
  }

  mounted() {
    this.dto.updateFields(this.root);
    this.$forceUpdate();
  }

  @Emit("change")
  onChange(status: FieldLoopStatus): FieldLoopStatus {
    this.dto.updateValidity();
    this.dto.field.status = status;
    this.dto.status.isValid = this.checkValidity();
    return this.dto.status;
  }

  checkValidity(): boolean {
    if (this.dto.field.status.isVisible && !this.dto.field.status.isValid) {
      return false;
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

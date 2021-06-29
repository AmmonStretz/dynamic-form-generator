<template>
  <!-- <div class="field-group" :class="{ horizontal: config.settings.horizontal }">
    <h2 v-if="!!config.settings && !!config.settings.title">{{ config.settings.title }}</h2>
    <div class="content">
      <FieldComponent
        v-for="(field, index) in config.fields"
        :key="index"
        v-bind:config="field"
        v-bind:root="root"
        v-on:change="onChange"
      ></FieldComponent>
    </div>
    <br />
    <p if="config.settings.description">{{ config.settings.description }}</p>
  </div> -->
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
// import { WizardConfig } from "../../Wizard/Wizard.config";
// import { FieldLoopConfig, FieldLoopStatus } from "./FieldLoop.config";
// import FieldComponent from "../Field.vue";

// Vue.component('FieldLoopComponent')
@Component({
  name: "FieldLoopComponent",
  components: {
    // FieldComponent,
  },
})
export default class FieldLoopComponent extends Vue {
//   @Prop() public config!: FieldLoopConfig;
//   @Prop() public root!: WizardConfig;

//   constructor() {
//     super();
//   }

//   mounted() {
//     this.config.updateFields();
//     this.$forceUpdate();
//   }

//   @Emit("change")
//   onChange(status: FieldLoopStatus): FieldLoopStatus {
//     this.config.updateValidity();
//     this.config.field.status = status;
//     this.config.status.isValid = this.checkValidity();
//     return this.config.status;
//   }

//   checkValidity(): boolean {
//     if (this.config.field.status.visible && !this.config.field.status.isValid) {
//       return false;
//     }
//     return true;
//   }

//   beforeCreate() {
//     if (this.$options.components)
//       (this.$options.components.FieldComponent as any) = require("../Field.vue").default;
//   }
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

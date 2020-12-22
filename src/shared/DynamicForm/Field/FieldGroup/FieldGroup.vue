<template>
  <div class="field-group" :class="{horizontal: dto.config.horizontal}">
    <h2 v-if="!!dto.config && !!dto.config.title">{{ dto.config.title }}</h2>
    <div class="content">

    <FieldComponent
      v-for="(field, index) in dto.fields"
      :key="index"
      v-bind:dto="field"
      v-bind:service="service"
      v-on:change="onChange"
    ></FieldComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { FormService } from "../../services/Form.service";
import { FieldStatus } from '../Field.dto';
import { FieldGroup } from "./FieldGroup.dto";
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

  public status: FieldStatus<{[key:string]: any}> = { key: null, value: {} }; //any
  @Prop() public service!: FormService;

  constructor(){
    super();
    this.status.key = this.dto.key;
  }

  @Emit("change")
  onChange(status: any) {
    this.status.value[status.key] = status;
    this.status.isValid = this.checkValidity();
    return this.status;
  }

  checkValidity(): boolean {
    for (const key in this.status.value) {
      if (!this.status.value[key].isValid) {
        return false;
      }
    }
    return true;
  }
  
  beforeCreate () {
    if(this.$options.components)
    this.$options.components.FieldComponent = require('../Field.vue').default
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

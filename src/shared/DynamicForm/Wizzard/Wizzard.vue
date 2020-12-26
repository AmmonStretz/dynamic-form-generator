<template>
  <div class="wizzard">
    <h1 v-if="!!dto.config && !!dto.config.title">{{ dto.config.title }}</h1>
    <div class="forms" v-for="(form, i) in dto.forms" :key="i">
      <FormComponent
        v-if="i == status.index"
        v-bind:dto="form"
        v-bind:service="service"
        v-on:change="onChange"
      ></FormComponent>
    </div>
    <nav>
      <button v-on:click="cancel">zurück</button>
      <button v-on:click="submit">
        {{ dto.forms.length - 1 > status.index ? "weiter" : "submit" }}
      </button>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { FormService } from "../services/Form.service";
import FormComponent from "../Form/Form.vue";
import { Wizzard, WizzardStatus } from "./Wizzard.dto";

@Component({
  components: {
    FormComponent,
  },
})
export default class WizzardComponent extends Vue {
  @Prop() public dto!: Wizzard;
  public service: FormService = new FormService();
  public status: WizzardStatus = {
    values: [],
    index: 0
  };

  @Emit("change")
  onChange(status: any) {
    this.status.values[this.status.index] = status;
    return this.status;
  }

  submit() {
    this.service.submit();
    if (this.status.values[this.status.index].isValid) {
      if (this.status.index < this.dto.forms.length - 1) {
        this.status.index++;
      } else if (this.status.index == this.dto.forms.length - 1) {
        console.log("last");
        console.log(this.status);
      }
    }
  }
  cancel(status: any) {
    if (this.status.index > 0) {
      this.status.index--;
    } else if (this.status.index == 0) {
    }
  }
}
</script>

<style scoped lang="scss">
</style>

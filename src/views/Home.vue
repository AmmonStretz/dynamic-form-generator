<template>
  <div class="home">
    <WizzardComponent v-bind:dto="dto" v-on:change="statusChange"></WizzardComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// import { JsonParser } from "@/shared/DynamicForm/parser";
import { Field } from "@/shared/DynamicForm/Field/Field.dto";
import { Form } from "@/shared/DynamicForm/Form/Form.dto";
import WizzardComponent from "@/shared/DynamicForm/Wizzard/Wizzard.vue";
import { Wizzard } from "@/shared/DynamicForm/Wizzard/Wizzard.dto";
import { config } from "./wizzard.config";

@Component({
  components: {
    WizzardComponent
  },
})
export default class Home extends Vue {

  public dto: Wizzard = config
  statusChange(status: any) {
    console.log(status);
  }
  mounted() {
    console.log(this.dto);
  }
  cancel() {
    console.log("cancel");
  }
  submit(status: any) {
    console.log("submit", status);
  }
}
</script>

<style scoped lang="scss">
</style>

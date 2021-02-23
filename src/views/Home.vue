<template>
  <div class="home">
    <WizzardComponent
      v-bind:dto="dto"
      v-on:change="statusChange"
      v-on:submit="submit"
    ></WizzardComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// import { JsonParser } from "@/shared/DynamicForm/parser";
import WizzardComponent from "../shared/DynamicForm/Wizzard/Wizzard.vue";
import {
  Wizzard,
  WizzardStatus,
} from "../shared/DynamicForm/Wizzard/Wizzard.dto";
import { config } from "../shared/data/wizzard.config";
import { WizzardParser } from "../shared/DynamicForm/Wizzard/Wizzard.parser";

@Component({
  components: {
    WizzardComponent,
  },
})
export default class Home extends Vue {
  public dto: Wizzard = WizzardParser.parseFromJSON((Vue as any).fieldParser, config);
  statusChange(status: WizzardStatus) {}
  mounted() {
    // console.clear();
    // console.log('----------------');
    // console.clear();
    // const a = new BooleanVar('A');
    // console.log(a.toJson());
    // console.log(MathParser.fromJson(a.toJson()));
    // const b = new BooleanConst(true)
    // console.log(b.toJson());
    // console.log(MathParser.fromJson(b.toJson()));
    // console.log(
    //   new BooleanVar('A').calc({A: false})
    // );
    // console.log(new BooleanVar('Key00').toJson());
    // console.log(123);
    // console.log(MathParser.fromJson({key: "boolean-const", name: true, value: true}));
    // console.log(321);
    // console.log(this.dto);
    // console.log(123, (this as any).$route.query);
    // this.$store.dispatch("addToDo", new ToDoModel("bla", true));
    // this.$store.dispatch("countUp", (this.a += 10));
  }
  cancel() {
    // console.log("cancel");
  }
  submit(status: WizzardStatus) {
    // (this as any).$store.dispatch("changeStatus", status);
    // (this as any).$router.push('results');
    console.log("submit", status);
  }
}
</script>

<style scoped lang="scss">
</style>

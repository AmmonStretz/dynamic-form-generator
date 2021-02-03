<template>
  <div class="home">
    <WizzardComponent v-bind:dto="dto" v-on:change="statusChange" v-on:submit="submit"></WizzardComponent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// import { JsonParser } from "@/shared/DynamicForm/parser";
import WizzardComponent from "../shared/DynamicForm/Wizzard/Wizzard.vue";
import { Wizzard, WizzardStatus } from "../shared/DynamicForm/Wizzard/Wizzard.dto";
import { DtoService } from "../shared/services/Dto.service";
import { MathParser } from "../shared/DynamicForm/math-logic/math-parser.class";
import { BooleanConst } from "../shared/DynamicForm/math-logic/objects/boolean/const";
import { BooleanVar } from "../shared/DynamicForm/math-logic/objects/boolean/var";

@Component({
  components: {
    WizzardComponent
  },
})
export default class Home extends Vue {

  public dto: Wizzard = DtoService.dto;
  statusChange(status: WizzardStatus) {

  }
  mounted() {
    console.clear();
    console.log('----------------');
    console.log(new BooleanVar('A').toJson());
    
    console.log(
      new BooleanVar('A').calc({A: false})
    );
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
    (this as any).$store.dispatch("changeStatus", status);
    (this as any).$router.push('results');
    // console.log("submit", status);
  }
}
</script>

<style scoped lang="scss">
</style>

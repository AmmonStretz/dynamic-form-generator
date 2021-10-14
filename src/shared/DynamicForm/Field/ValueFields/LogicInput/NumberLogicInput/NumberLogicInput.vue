<template>
  <div class="number-input-logic">
    <PathSelector
      :path="config.options"
      :value="first"
      filter="number-var"
      :additionalOperations="additionalOperations"
      @change="selectFirst"
    />
    <input
      type="number"
      v-if="first && first.type == 'number-const'"
      v-model="first.value"
      @change="change"
    />
    <!-- <Combination :config="config" :value="condition" @change="change" /> -->
    <!-- <ConditionList :config="config"/> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ValueFieldStatus } from "../../ValueField.config";
import { NumberLogicInputConfig } from "./NumberLogicInput.config";
import { NumberCondition } from "../../../../../ts-condition-parser/condition.class";
import Combination from "../Combination.vue";
import PathSelector from "./../PathSelector/PathSelector.vue";
import { NumberConst, NumberVar } from "../../../../../ts-condition-parser/objects/number.class";

@Component({
  name: "NumberLogicInputComponent",
  components: {
    Combination,
    PathSelector
  },
})
export default class NumberLogicInputComponent extends Vue {
  @Prop() private config!: NumberLogicInputConfig;
  first: { name: string, type: string, value: any } = null;
  public additionalOperations: any[] = [
    { name: "Engabewert", type: "number-const", value: 0 },
  ];

  mounted() {
    if(this.config.status.value == null){
      this.first = { name: "Engabewert", type: "number-const", value: 1 }
    }
  }

  @Emit("change")
  change(): ValueFieldStatus<NumberCondition> {
    this.config.status.value = new NumberConst(1);
    if(!!this.first){
      if(this.first.type == 'number-const') {
        this.config.status.value = new NumberConst(this.first.value);
      } else if(this.first.type == 'number-var'){
        this.config.status.value = new NumberVar(this.first.value);
      }
    }
    console.log(this.config.status);
    
    return this.config.status;
  }
  selectFirst(first: { name: string; type: string; value: any }) {
    this.first = first;
    this.change();
  }
}
</script>

<style scoped lang="scss">
.number-input-logic {
  display: flex;
}
</style>

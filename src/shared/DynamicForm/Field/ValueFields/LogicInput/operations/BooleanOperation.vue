<template>
  <div class="boolean-operation">
    <select name="" id="" v-model="type" @change="updateParsed">
      <option v-for="(comparator, i) in comparators" :key="i" :value="i">
        {{ comparator.name }}
      </option>
    </select>
    <PathSelector v-if="config" :path="config.options" :value="value.second" filter="boolean-var" :additionalOperations="additionalOperations" @change="selectSecond"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { BooleanCondition } from "../../../../../ts-condition-parser/condition.class";
import {
  BooleanConst,
  BooleanVar,
  Equal,
  NotEqual,
} from "../../../../../ts-condition-parser/objects/boolean.class";
import { BooleanLogicInputConfig } from "../BooleanLogicInput/BooleanLogicInput.config";
import { BooleanConditionParser } from "../../../../../ts-condition-parser/parsers/boolean.class";
import PathSelector from "./../PathSelector/PathSelector.vue";

@Component({
  name: "BooleanOperation",
  components: {
    PathSelector
  }
})
export default class BooleanOperation extends Vue {
  @Prop() private config!: BooleanLogicInputConfig;
  @Prop() private value: {
    first: any;
    type: string;
    second: any;
  };
  public additionalOperations: any[] = [
      { name: "Wahr", type: "boolean-const", value: true },
      { name: "Falsch", type: "boolean-const", value: false },
    ];

  comparators: any[] = [
    {
      name: "ist gleich",
      type: "EQ",
    },
    {
      name: "ist nicht gleich",
      type: "NE",
    },
  ];

  private second: { name: string, type: string, value: any } = null;
  private type: number = null;

  public $refs: any;
  public $store: any;

  selectSecond(second: { name: string, type: string, value: any }) {
    this.second = second;
    if (this.second != null && this.type != null) {
      this.change();
    }
  }

  updateParsed() {
    if (this.second != null && this.type != null) {
      this.change();
    }
  }

  @Emit("change")
  change(): BooleanCondition {
    const first: BooleanCondition = BooleanConditionParser.fromJson(
      this.value.first
    );
    let second: BooleanCondition;
    switch (this.second.type) {
      case "boolean-const":
        second = new BooleanConst(this.second.value);
        break;
      default:
        second = new BooleanVar(this.second.value);
    }
    switch (this.comparators[this.type].type) {
      case "EQ":
        return new Equal(first, second);
      case "NE":
        return new NotEqual(first, second);
    }

    return null;
  }

  mounted() {
    if (this.value.type) {
      for (let i = 0; i < this.comparators.length; i++) {
        const comparator = this.comparators[i];
        if (comparator.type == this.value.type) {
          this.type = i;
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.boolean-operation {
  display: flex;
  gap: 8px;
}
</style>

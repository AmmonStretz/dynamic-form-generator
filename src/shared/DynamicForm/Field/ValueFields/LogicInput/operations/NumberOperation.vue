<template>
  <div class="number-operation">
    <select name="" id="" v-model="type" @change="updateParsed">
      <option v-for="(comparator, i) in comparators" :key="i" :value="i">
        {{ comparator.name }}
      </option>
    </select>
    <PathSelector
      v-if="config"
      :path="config.options"
      :value="value.second"
      filter="number-var"
      :additionalOperations="additionalOperations"
      @change="selectSecond"
    />
    <input
      type="number"
      v-if="second && second.type == 'number-const'"
      v-model="second.value"
      @change="updateParsed"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import {
  BooleanCondition,
  NumberCondition,
  StringCondition,
} from "../../../../../ts-condition-parser/condition.class";
import {
  Equal,
  GreaterEqual,
  GreaterThan,
  LessEqual,
  LessThan,
  NotEqual,
} from "../../../../../ts-condition-parser/objects/boolean.class";
import { LogicInputConfig } from "../LogicInput.config";
import {
  NumberConst,
  NumberVar,
} from "../../../../../ts-condition-parser/objects/number.class";
import { NumberConditionParser } from "../../../../../ts-condition-parser/parsers/number.class";
import PathSelector from "./../PathSelector/PathSelector.vue";

@Component({
  name: "NumberOperation",
  components: {
    PathSelector,
  },
})
export default class NumberOperation extends Vue {
  @Prop() private config!: LogicInputConfig;
  @Prop() private value: {
    first: any;
    type: string;
    second: any;
  };
  public additionalOperations: any[] = [
    { name: "Engabewert", type: "number-const", value: 0 },
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
    {
      name: "ist kleiner als",
      type: "LT",
    },
    {
      name: "ist kleiner gleich",
      type: "LE",
    },
    {
      name: "ist größer als",
      type: "GT",
    },
    {
      name: "ist größer gleich",
      type: "GE",
    },
  ];
  private second: { name: string; type: string; value: any } = null;
  private type: number = null;

  public $refs: any;
  public $store: any;

  updateParsed() {
    if (this.second != null && this.type != null) {
      this.change();
    }
  }
  selectSecond(second: { name: string; type: string; value: any }) {
    this.second = second;
    if (this.second != null && this.type != null) {
      this.change();
    }
  }
  @Emit("change")
  change(): BooleanCondition {
    const first: NumberCondition = NumberConditionParser.fromJson(
      this.value.first
    );
    let second: NumberCondition;
    if (this.second.type == "number-const") {
      second = new NumberConst(this.second.value);
    } else {
      second = new NumberVar(this.second.value);
    }
    switch (this.comparators[this.type].type) {
      case "EQ":
        return new Equal(first, second);
      case "NE":
        return new NotEqual(first, second);
      case "GT":
        return new GreaterThan(first, second);
      case "GE":
        return new GreaterEqual(first, second);
      case "LT":
        return new LessThan(first, second);
      case "LE":
        return new LessEqual(first, second);
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
    if (this.value.second) {
      if (this.value.second.type == "number-const") {
        this.second = {
          type: "number-const",
          value: this.value.second.value,
          name: "Eingabewert",
        };
      }
    }
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>

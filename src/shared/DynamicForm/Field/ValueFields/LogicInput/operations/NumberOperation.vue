<template>
  <div class="number-operation">
    <select name="" id="" v-model="type" @change="updateParsed">
      <option v-for="(comparator, i) in comparators" :key="i" :value="i">
        {{ comparator.name }}
      </option>
    </select>
    <select v-model="selected" v-if="config" @change="updateParsed">
      <option v-for="(path, j) in paths" :key="j" :value="j">
        {{ path.name }}
      </option>
    </select>
    <input
      type="number"
      v-if="selected == 0"
      v-model="secondValue"
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

@Component({
  name: "BooleanOperation",
})
export default class NumberOperation extends Vue {
  @Prop() private config!: LogicInputConfig;
  @Prop() private value: {
    first: any;
    type: string;
    second: any;
  };

  get paths() {
    let a: any[] = [{ name: "Eingabewert", type: "number-const", value: "" }];
    this.config.options
      .filter((option) => option.type == "number")
      .forEach((option) => {
        a.push({ type: "number-var", value: option.path, name: option.path });
      });

    return a;
  }

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

  private selected: number = null;
  private type: number = null;
  private secondValue: number = null;

  public $refs: any;
  public $store: any;

  updateParsed() {
    if (this.selected != null && this.type != null) {
      this.change();
    }
  }

  @Emit("change")
  change(): BooleanCondition {
    const first: NumberCondition = NumberConditionParser.fromJson(
      this.value.first
    );
    let second: NumberCondition;
    if (this.paths[this.selected].type == "number-const") {
      second = new NumberConst(this.secondValue);
    } else {
      second = new NumberVar(this.paths[this.selected].value);
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
        this.selected = 0;
        this.secondValue = this.value.second.value;
      }
      for (let i = 0; i < this.paths.length; i++) {
        const path = this.paths[i];

        if (
          path.type == this.value.second.type &&
          path.value == this.value.second.value
        ) {
          this.selected = i;
        }
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

<template>
  <div class="boolean-operation">
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
import { LogicInputConfig } from "../LogicInput.config";
import { BooleanConditionParser } from "../../../../../ts-condition-parser/parsers/boolean.class";

@Component({
  name: "BooleanOperation",
})
export default class BooleanOperation extends Vue {
  @Prop() private config!: LogicInputConfig;
  @Prop() private value: {
    first: any;
    type: string;
    second: any;
  };

  get paths() {
    let a: any[] = [
      { name: "Wahr", type: "boolean-const", value: true },
      { name: "Falsch", type: "boolean-const", value: false },
    ];
    this.config.options
      .filter((option) => option.type == "boolean")
      .forEach((option) => {
        a.push({ type: "boolean-var", value: option.path, name: option.path });
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
  ];

  private selected: number = null;
  private type: number = null;

  public $refs: any;
  public $store: any;

  updateParsed() {
    if (this.selected != null && this.type != null) {
      this.change();
    }
  }

  @Emit("change")
  change(): BooleanCondition {
    const first: BooleanCondition = BooleanConditionParser.fromJson(
      this.value.first
    );
    let second: BooleanCondition;
    switch (this.paths[this.selected].type) {
      case "boolean-const":
        second = new BooleanConst(this.paths[this.selected].value);
        break;
      default:
        second = new BooleanVar(this.paths[this.selected].value);
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

    if (this.value.second) {
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

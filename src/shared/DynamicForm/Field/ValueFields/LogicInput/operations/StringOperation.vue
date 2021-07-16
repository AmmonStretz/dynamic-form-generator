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
    <input
      type="text"
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
  StringCondition,
} from "../../../../../ts-condition-parser/condition.class";
import {
  Equal,
  NotEqual,
} from "../../../../../ts-condition-parser/objects/boolean.class";
import {
  StringConst,
  StringVar,
} from "../../../../../ts-condition-parser/objects/string.class";
import { LogicInputConfig } from "../LogicInput.config";
import { StringConditionParser } from "../../../../../ts-condition-parser/parsers/string.class";

@Component({
  name: "BooleanOperation",
})
export default class StringOperation extends Vue {
  @Prop() private config!: LogicInputConfig;
  @Prop() private value: {
    first: any;
    type: string;
    second: any;
  };

  get paths() {
    let a: any[] = [{ name: "Eingabewert", type: "string-const", value: "" }];
    this.config.options
      .filter((option) => option.type == "string")
      .forEach((option) => {
        a.push({ type: "string-var", value: option.path, name: option.path });
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
  private secondValue: string = null;

  public $refs: any;
  public $store: any;

  updateParsed() {
    if (this.selected != null && this.type != null) {
      this.change();
    }
  }

  @Emit("change")
  change(): BooleanCondition {
    const first: StringCondition = StringConditionParser.fromJson(
      this.value.first
    );
    let second: StringCondition;
    switch (this.paths[this.selected].type) {
      case "string-const":
        second = new StringConst(this.secondValue);
        break;
      default:
        second = new StringVar(this.paths[this.selected].value);
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
        if (this.comparators[i].type == this.value.type) {
          this.type = i;
        }
      }
    }
    if (this.value.second) {
      if (this.value.second.type == "string-const") {
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

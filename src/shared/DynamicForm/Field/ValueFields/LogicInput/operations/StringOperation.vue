<template>
  <div class="string-operation">
    <select name="" id="" v-model="type" @change="updateParsed">
      <option v-for="(comparator, i) in comparators" :key="i" :value="i">
        {{ comparator.name }}
      </option>
    </select>
    <PathSelector
      v-if="config"
      :path="config.options"
      :value="value.second"
      filter="string-var"
      :additionalOperations="additionalOperations"
      @change="selectSecond"
    />
    <input
      type="string"
      v-if="second && second.type == 'string-const'"
      v-model="second.value"
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
import { LogicInputConfig } from "../LogicInput.config";
import PathSelector from "./../PathSelector/PathSelector.vue";
import { StringConditionParser } from "../../../../../ts-condition-parser/parsers/string.class";
import { StringConst, StringVar } from "../../../../../ts-condition-parser/objects/string.class";

@Component({
  name: "StringOperation",
  components: {
    PathSelector,
  },
})
export default class StringOperation extends Vue {
  @Prop() private config!: LogicInputConfig;
  @Prop() private value: {
    first: any;
    type: string;
    second: any;
  };
  public additionalOperations: any[] = [
    { name: "Engabewert", type: "string-const", value: '' },
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
    const first: StringCondition = StringConditionParser.fromJson(
      this.value.first
    );
    let second: StringCondition;
    if (this.second.type == "string-const") {
      second = new StringConst(this.second.value);
    } else {
      second = new StringVar(this.second.value);
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
      if (this.value.second.type == "string-const") {
        this.second = {
          type: "string-const",
          value: this.value.second.value,
          name: "Eingabewert",
        };
      }
    }
  }
}
</script>

<style scoped lang="scss">
.string-operation {
  display: flex;
  gap: 8px;
}
</style>

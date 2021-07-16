<template>
  <div class="condition">
    <select
      name=""
      id=""
      v-if="value"
      v-model="selectedPath"
      @change="selectPath()"
    >
      <option v-for="(path, j) in config.options" :key="j" :value="j">
        {{ path.path }}
      </option>
    </select>
    <BooleanOperation
      v-if="
        operation && operation.first && operation.first.type == 'boolean-var'
      "
      :config="config"
      :value="operation"
      @change="change"
    />

    <StringOperation
      v-if="
        operation && operation.first && operation.first.type == 'string-var'
      "
      :config="config"
      :value="operation"
      @change="change"
    />

    <NumberOperation
      v-if="
        operation && operation.first && operation.first.type == 'number-var'
      "
      :config="config"
      :value="operation"
      @change="change"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import {
  BooleanCondition,
  Condition,
} from "../../../../ts-condition-parser/condition.class";
import { LogicInputConfig } from "./LogicInput.config";
import BooleanOperation from "./operations/BooleanOperation.vue";
import StringOperation from "./operations/StringOperation.vue";
import NumberOperation from "./operations/NumberOperation.vue";
import { BooleanVar } from "../../../../ts-condition-parser/objects/boolean.class";
import { NumberVar } from "../../../../ts-condition-parser/objects/number.class";
import { StringVar } from "../../../../ts-condition-parser/objects/string.class";

@Component({
  name: "ConditionComponent",
  components: {
    BooleanOperation,
    StringOperation,
    NumberOperation,
  },
})
export default class ConditionComponent extends Vue {
  @Prop() private config!: LogicInputConfig;
  @Prop() private value!: { type: string; first: any; second: any };
  @Prop() public index: number;

  get paths() {
    return this.config.options;
  }
  private selectedPath: number = null;
  private operation: {
    first: Condition<any>;
    type: string;
    second: any;
  } = null;

  public $refs: any;
  public $store: any;

  public parsedCondition: BooleanCondition = null;

  mounted() {
    this.operation = this.value;
    if (this.value?.first?.key && this.value?.first?.type) {
      for (let i = 0; i < this.paths.length; i++) {
        const path = this.paths[i];
        if (
          this.value.first.key == path.path &&
          this.value.first.type == path.type + "-var"
        ) {
          this.selectedPath = i;
        }
      }
    }
  }
  selectPath() {
    if (this.paths[this.selectedPath].type == "boolean") {
      this.operation.first = new BooleanVar(this.paths[this.selectedPath].path);
    } else if (this.paths[this.selectedPath].type == "number") {
      this.operation.first = new NumberVar(this.paths[this.selectedPath].path);
    } else if (this.paths[this.selectedPath].type == "string") {
      this.operation.first = new StringVar(this.paths[this.selectedPath].path);
    }
    this.operation.type = null;
    this.operation.second = null;
  }
  @Emit("change")
  change(condition: BooleanCondition): {
    index: number;
    condition: BooleanCondition;
  } {
    return { index: this.index, condition: condition };
  }
}
</script>

<style scoped lang="scss">
.condition {
  display: flex;
}
input.show:not(.valid) {
  background-color: red;
}
</style>

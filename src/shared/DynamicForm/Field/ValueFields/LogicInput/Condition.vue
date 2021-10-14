<template>
  <div class="condition">
    <div class="content">
      <PathSelector
        v-if="value"
        :path="config.options"
        :value="value.first"
        @change="selectPath"
      />
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
    <nav>
      <button type="button" class="btn-round" @click="deleteCondition">
        <img src="../../../../../assets/icons/close.svg" alt="" />
      </button>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import {
  BooleanCondition,
  Condition,
} from "../../../../ts-condition-parser/condition.class";
import { BooleanLogicInputConfig } from "./BooleanLogicInput/BooleanLogicInput.config";
import BooleanOperation from "./operations/BooleanOperation.vue";
import StringOperation from "./operations/StringOperation.vue";
import NumberOperation from "./operations/NumberOperation.vue";
import PathSelector from "./PathSelector/PathSelector.vue";
import { BooleanVar } from "../../../../ts-condition-parser/objects/boolean.class";
import { NumberVar } from "../../../../ts-condition-parser/objects/number.class";
import { StringVar } from "../../../../ts-condition-parser/objects/string.class";

@Component({
  name: "ConditionComponent",
  components: {
    BooleanOperation,
    StringOperation,
    NumberOperation,
    PathSelector,
  },
})
export default class ConditionComponent extends Vue {
  @Prop() private config!: BooleanLogicInputConfig;
  @Prop() private value!: { type: string; first: any; second: any };
  @Prop() public index: number;

  get paths() {
    return this.config.options;
  }
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
  }
  selectPath(path: { name: string; value: string; type: string }) {
    this.operation = { first: null, type: null, second: null };
    if (path.type == "boolean-var") {
      this.operation.first = new BooleanVar(path.value);
    } else if (path.type == "number-var") {
      this.operation.first = new NumberVar(path.value);
    } else if (path.type == "string-var") {
      this.operation.first = new StringVar(path.value);
    }
    this.operation.type = null;
    this.operation.second = null;
  }
  @Emit("delete")
  deleteCondition() {}
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
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
  .content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .btn-round {
    border: none;
    outline: none;
    background-color: white;
    margin-left: 16px;
    padding: 10px;
    border-radius: 50%;
    img {
      display: block;
    }
  }
}
</style>

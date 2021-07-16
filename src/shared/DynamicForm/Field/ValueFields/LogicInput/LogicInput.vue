<template>
  <div class="boolean-input">
    <Combination :config="config" :value="condition" @change="change" />
    <!-- <ConditionList :config="config"/> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ValueFieldStatus } from "../ValueField.config";
import { LogicInputConfig } from "./LogicInput.config";
import { BooleanCondition } from "../../../../ts-condition-parser/condition.class";
import Combination from "./Combination.vue";
import {
  And,
  BooleanConst,
} from "../../../../ts-condition-parser/objects/boolean.class";

@Component({
  name: "LogicInputComponent",
  components: {
    Combination,
  },
})
export default class LogicInputComponent extends Vue {
  @Prop() private config!: LogicInputConfig;
  public condition: { type: string; operators: any[] } =
    this.defaultCondition.toJson();
  public $refs: any;

  get defaultCondition(): BooleanCondition {
    if (
      !this.config.settings.default ||
      this.config.settings.default instanceof BooleanConst
    ) {
      return new And([]);
    } else {
      return this.config.settings.default;
    }
  }

  @Emit("change")
  change(condition: {
    index: number;
    condition: BooleanCondition;
  }): ValueFieldStatus<BooleanCondition> {
    this.config.status.value = condition.condition;
    this.condition = condition.condition.toJson();
    this.config.status.isValid = true; // TODO: check validity
    return this.config.status;
  }
}
</script>

<style scoped lang="scss">
input.show:not(.valid) {
  background-color: red;
}
</style>

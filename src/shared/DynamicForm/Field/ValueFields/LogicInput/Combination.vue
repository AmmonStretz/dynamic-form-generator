<template>
  <div class="combination">
    <header>
      <select v-model="value.type" @change="change()">
        <option value="boolean-and">UND</option>
        <option value="boolean-or">ODER</option>
      </select>
      <div class="description" v-html="description"></div>

      <button type="button" class="btn-round" v-if="!isRoot" @click="deleteCondition">
        <img src="../../../../../assets/icons/close.svg" alt="" />
      </button>
    </header>
    <main v-if="value">
      <div v-for="(condition, i) in value.operators" :key="i">
        <Condition
          :config="config"
          :value="condition"
          v-if="
            condition.type != 'boolean-and' && condition.type != 'boolean-or'
          "
          @change="changeOperator"
          @delete="deleteCondition(i)"
          :ref="i"
          :index="i"
        />
        <Combination
          :config="config"
          :value="condition"
          v-if="
            condition.type == 'boolean-and' || condition.type == 'boolean-or'
          "
          @change="changeOperator"
          :ref="i"
          :index="i"
        />
      </div>
      <nav>
        <button type="button" class="btn-round" v-if="!navIsOpen" @click="navIsOpen = true">
          <img src="../../../../../assets/icons/add.svg" alt="" />
        </button>
        <button type="button" v-if="navIsOpen" @click="addOperation()">
          Vergleich
        </button>
        <button type="button" v-if="navIsOpen" @click="addCombination()">
          Verknüpfung
        </button>
      </nav>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { BooleanCondition } from "../../../../ts-condition-parser/condition.class";
import { LogicInputConfig } from "./LogicInput.config";
import BooleanOperation from "./operations/BooleanOperation.vue";
import Condition from "./Condition.vue";
import { And, Or } from "../../../../ts-condition-parser/objects/boolean.class";
import { BooleanConditionParser } from "../../../../ts-condition-parser/parsers/boolean.class";
import LogicInputComponent from "./LogicInput.vue";

@Component({
  name: "Combination",
  components: {
    BooleanOperation,
    Condition,
    Combination,
  },
})
export default class Combination extends Vue {
  @Prop() private config!: LogicInputConfig;
  @Prop() public value!: { type: string; operators: any[] };
  @Prop() public index: number;
  navIsOpen: boolean = false;
  parsedConditions: BooleanCondition[] = [];

  get description() {
    if (!this.value) return "error";
    return this.value.type == "boolean-and"
      ? "<b>Alle</b> der <b>" +
          this.value.operators.length +
          "</b> folgenden Aussage müssen wahr sein."
      : "<b>Mindestens eine</b> der <b>" +
          this.value.operators.length +
          "</b> folgenden Aussagen muss wahr sein.";
  }
  addOperation() {
    this.navIsOpen = false;
    this.value.operators.push({ type: null, left: null, right: null });
  }
  addCombination() {
    this.navIsOpen = false;
    this.value.operators.push({ type: "boolean-and", operators: [] });
  }
  get isRoot() {
    return this.$parent instanceof LogicInputComponent;
  }
  mounted() {
    this.parsedConditions = [];
    this.value.operators.forEach((operator) => {
      this.parsedConditions.push(BooleanConditionParser.fromJson(operator));
    });
  }
  deleteCondition(i: number) {
    this.parsedConditions.splice(i, 1);
    this.change();
  }
  changeOperator(condition: { index: number; condition: BooleanCondition }) {
    if (condition) {
      this.parsedConditions[condition.index] = condition.condition;
    }
    this.change();
  }
  @Emit("change")
  change(): {
    index: number;
    condition: BooleanCondition;
  } {
    if (this.value.type == "boolean-and") {
      return { index: this.index, condition: new And(this.parsedConditions) };
    } else {
      return { index: this.index, condition: new Or(this.parsedConditions) };
    }
  }
}
</script>

<style scoped lang="scss">
.combination {
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
  header {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  main {
    border-left: 2px solid black;
    padding: 16px 0 0 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding-left: 8px;
    gap: 8px;
    .content {
      display: flex;
      align-items: center;
    }
  }
}
</style>

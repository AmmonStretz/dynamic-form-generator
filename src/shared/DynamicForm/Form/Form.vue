<template>
  <form class="form" v-if="config && config.status">
    <h2 v-if="!!config.settings && !!config.settings.title">{{ config.settings.title }}</h2>
    <FieldComponent
      v-for="(field, index) in config.fields"
      :key="index"
      v-bind:config="field"
      v-bind:status="field.status"
      v-bind:root="root"
      v-on:change="onChange"
      ref="childs"
    ></FieldComponent>
    <p if="config.settings.description">{{ config.settings.description }}</p>

    <div>
      <button type="button" v-on:click="fireBefore()">
        {{ root.settings.prevButtonText ? root.settings.prevButtonText : "Zurück" }}
      </button>
      <button
        type="button"
        v-on:click="after()"
      >
        {{ root.settings.nextButtonText ? root.settings.nextButtonText : "Weiter" }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import FieldComponent from "../Field/Field.vue";
import { Form, FormStatus } from "./Form.config";
import { ValueFieldStatus } from "../Field/ValueFields/ValueField.config";
import { Wizzard } from "../Wizzard/Wizzard.config";

@Component({
  components: {
    FieldComponent,
  },
})
export default class FormComponent extends Vue {

  @Prop() public config!: Form;
  @Prop() public root!: Wizzard;

  @Emit("change")
  onChange(status: ValueFieldStatus<any>): FormStatus {
    const index: number = this.config.fields.findIndex(
      (field) => field.status.key == status.key
    );
    this.config.fields[index].status = status;
    this.config.status.isValid = this.checkValidity();
    this.root.status.update();
    return this.config.status;
  }

  mounted() {
    if (this.config.visible.calc) {
      this.config.status.isVisible = this.config.visible.calc((key) =>
        this.config.status.getValueByKey(key)
      );
      if (this.config.status.isVisible == false) {
        this.after();
      }
    }
  }

  checkValidity(): boolean {
    for (let i = 0; i < this.config.fields.length; i++) {
      const status = this.config.fields[i].status;
      if (status.isVisible && !status.isValid) {
        return false;
      }
    }
    return true;
  }

  @Emit("before")
  fireBefore() {
    return;
  }
  after() {
    if (this.config.status.isValid || !this.config.status.isVisible) {
      this.fireAfter();
    } else {
      this.config.status.showAllErrors();
      this.config.status.update();
    }
    return;
  }
  @Emit("after")
  fireAfter() {
    return;
  }
}
</script>

<style scoped lang="scss">
</style>

<template>
  <form class="form" v-if="dto && dto.status">
    <h2 v-if="!!dto.config && !!dto.config.title">{{ dto.config.title }}</h2>
    <FieldComponent
      v-for="(field, index) in dto.fields"
      :key="index"
      v-bind:dto="field"
      v-bind:status="field.status"
      v-bind:root="root"
      v-on:change="onChange"
    ></FieldComponent>
    <!-- {{visibility}}<br> -->
    <!-- {{ status.visible ? "Sichtbar" : "Unsichtbar" }}<br /> -->
    <!-- {{status}} -->
    <p if="dto.config.description">{{ dto.config.description }}</p>

    <div>
      <button type="button" v-on:click="before()">Zurück</button>
      <button type="button" :disabled="!dto.status.isValid" v-on:click="after()">Weiter</button>
      <!-- <button v-on:click="cancel">
        {{ dto.config.prevButtonText ? dto.config.prevButtonText : "Zurück" }}
      </button>
      <button
        v-if="dto.forms.length - 1 <= currentStatus.index"
        v-on:click="next"
      >
        {{
          dto.config.submitButtonText ? dto.config.submitButtonText : "Fertig"
        }}
      </button>
      <button
        v-if="dto.forms.length - 1 > currentStatus.index"
        v-on:click="next"
      >
        {{ dto.config.nextButtonText ? dto.config.nextButtonText : "Weiter" }}
      </button> -->
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import FieldComponent from "../Field/Field.vue";
import { Form, FormStatus } from "./Form.dto";
import { ValueFieldStatus } from "../Field/ValueFields/ValueField.dto";
import { Wizzard } from "../Wizzard/Wizzard.dto";

@Component({
  components: {
    FieldComponent,
  },
})
export default class FormComponent extends Vue {
  @Prop() public dto!: Form;

  // @Prop()
  // public status: FormStatus;
  @Prop() public root!: Wizzard;

  @Emit("change")
  onChange(status: ValueFieldStatus<any>): FormStatus {
    const index: number = this.dto.fields.findIndex(field=>field.status.key == status.key);
    this.dto.fields[index].status = status;
    this.dto.status.isValid = this.checkValidity();
    this.root.updateStatus();    
    return this.dto.status;
  }

  mounted() {
    if (this.dto.visible.calc) {
      this.dto.status.visible = this.dto.visible.calc(
        (key) => this.root.getStatusByKey(key)
      );
      if (this.dto.status.visible == false) {
        this.after();
      }
    }
  }

  // get visibility(): any {
  //   if (this.dto.visible.calc && this.values) {
  //     this.dto.status.visible = this.dto.visible.calc(this.values);
  //     return this.dto.status.visible;
  //   }
  //   return true;
  // }

  checkValidity(): boolean {
    for (let i = 0; i < this.dto.fields.length; i++) {
      const status = this.dto.fields[i].status;
      if (status.visible && !status.isValid) {
        return false;
      }
    }
    return true;
  }

  @Emit("before")
  before() {
    return;
  }
  after() {
    if (this.dto.status.isValid || !this.dto.status.visible) {
      this.fireAfter();
    } else {
      console.log('showErrors');
      
      this.dto.showAllErrors();
      console.log(this.dto);
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

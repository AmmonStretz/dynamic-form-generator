<template>
  <form class="form" v-if="status && dto">
    <h2 v-if="!!dto.config && !!dto.config.title">{{ dto.config.title }}</h2>
    <FieldComponent
      v-for="(field, index) in dto.fields"
      :key="index"
      v-bind:dto="field"
      v-bind:status="status.fields[dto.fields[index].key]"
      v-bind:values="values"
      v-on:change="onChange"
    ></FieldComponent>
    <!-- {{visibility}}<br> -->
    <!-- {{ status.visible ? "Sichtbar" : "Unsichtbar" }}<br /> -->
    <!-- {{status}} -->
    <p if="dto.config.description">{{ dto.config.description }}</p>

    <div>
      <button type="button" v-on:click="before()">Zurück</button>
      <button type="button" v-on:click="after()">Weiter</button>
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
import { ValueFieldStatus } from "../Field/Field.dto";

@Component({
  components: {
    FieldComponent,
  },
})
export default class FormComponent extends Vue {
  @Prop() public dto!: Form;

  @Prop()
  public status: FormStatus;
  @Prop()
  public values!: { [key: string]: any };

  @Emit("change")
  onChange(status: ValueFieldStatus<any>): FormStatus {
    this.status.fields[status.key] = status;
    this.status.isValid = this.checkValidity();
    return this.status;
  }

  mounted(){
      if (this.dto.visible.calc && this.values) {
        this.status.visible = this.dto.visible.calc(this.values);
        // TODO: Fields Error is shown
        if(this.status.visible == false){
          this.after();
        }
    }
  }

  // get visibility(): any {
  //   if (this.dto.visible.calc && this.values) {
  //     this.status.visible = this.dto.visible.calc(this.values);
  //     return this.status.visible;
  //   }
  //   return true;
  // }

  checkValidity(): boolean {
    for (const key in this.status.fields) {
      const field = this.status.fields[key];
      if (field.visible && !field.isValid) {
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
    if (this.status.isValid || !this.status.visible) {
      this.fireAfter();
    } else {
      this.status.showAllErrors();
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

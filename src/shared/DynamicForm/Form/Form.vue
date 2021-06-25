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
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import FieldComponent from "../Field/Field.vue";
import { FormConfig, FormStatus } from "./Form.config";
import { ValueFieldStatus } from "../Field/ValueFields/ValueField.config";
import { ContentFieldConfig } from "../Field/ContentFields/ContentField.config";
import { ChapterConfig } from "../Chapter/Chapter.config";

@Component({
  components: {
    FieldComponent,
  },
})
export default class FormComponent extends Vue {

  @Prop() public config!: FormConfig;
  @Prop() public root!: ChapterConfig;

  @Emit("change")
  onChange(status: ValueFieldStatus<any>): FormStatus {
    
    const index: number = this.config.fields.findIndex(
      (field) => field.status.key == status.key
    );
    this.config.fields[index].status = status;
    this.config.status.children[index] = status;
    this.config.status.isValid = this.checkValidity();
    if(this.root){
      this.root.status.update();
    }
    return this.config.status;
  }

  mounted() {
    if (this.config.visible.calc) {
      this.config.status.isVisible = this.config.visible.calc((key) =>
        this.config.status.getValueByKey(key)
      );
    }
    this.config.status.isValid = this.checkValidity();
  }

  checkValidity(): boolean {
    for (let i = 0; i < this.config.fields.length; i++) {
      if(!(this.config.fields instanceof ContentFieldConfig)) {
        const status = this.config.fields[i].status;
        if (status.isVisible && !status.isValid) {
          return false;
        }
      }
    }    
    return true;
  }
}
</script>

<style scoped lang="scss">
</style>

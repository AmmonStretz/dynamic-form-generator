<template>
  <form class="form" v-if="config && config.status && value">
    <h2 v-if="!!config.settings && !!config.settings.title">{{ config.settings.title }}</h2>
    <Field
      v-for="(field, index) in config.fields"
      :key="index"
      v-bind:config="field"
      v-bind:status="value.children[index]"
      v-bind:root="root"
      v-on:change="onChange"
      ref="childs"
    ></Field>
    <p if="config.settings.description">{{ config.settings.description }}</p>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import Field from "../Field/Field.vue";
import { FormConfig, FormStatus } from "./Form.config";
import { ContentFieldConfig } from "../Field/ContentFields/ContentField.config";
import { FinderConfig } from "../Finder/Finder.config";
import { FieldStatus } from "../Field/Field.config";

@Component({
  components: {
    Field,
  },
})
export default class Form extends Vue {

  @Prop() public config!: FormConfig;
  @Prop() public root!: FinderConfig;
  @Prop() public status!: FormStatus;
  private value: FormStatus = null;
  mounted() {
    this.value = this.status? this.status : this.config.status;
    if (this.config.visible.calc) {
      this.config.status.visible = this.config.visible.calc((key) =>
        this.config.status.getValueByKey(key)
      );
    }
    this.config.status.isValid = this.checkValidity();
  }

  @Emit("change")
  onChange(status: FieldStatus): FormStatus {
    this.config.status.update();
    const index: number = this.config.fields.findIndex(
      (field) => field.status.key == status.key
    );
    this.config.fields[index].status = status;
    this.config.status.children[index] = status;
    this.config.status.isValid = this.checkValidity();

    return this.config.status;
  }
  
  checkValidity(): boolean {
    for (let i = 0; i < this.config.fields.length; i++) {
      if(!(this.config.fields instanceof ContentFieldConfig)) {
        const status = this.config.fields[i].status;
        if (status.visible && !status.isValid) {
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

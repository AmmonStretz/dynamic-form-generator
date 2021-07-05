<template>
  <div class="field">
    <header>
      <h2>
        {{ config.type }}: <span>{{ config.settings.name }}</span>
      </h2>
      <button @click="add">
        <img src="../../../assets/icons/add.svg" alt="" />
      </button>
      <button @click="editField">
        <img src="../../../assets/icons/settings.svg" alt="" />
      </button>
      <button @click="deleteField">
        <img src="../../../assets/icons/delete.svg" alt="" />
      </button>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { FieldConfig } from "../../DynamicForm/Field/Field.config";
import { Status } from "../../DynamicForm/status";
import { addFieldGenerator, deleteFieldGenerator, editFieldGenerator } from "./sidebar-menu.forms";

@Component({
  components: {},
})
export default class FieldEditorComponent extends Vue {
  @Prop() public config!: FieldConfig;
  public $store: any;
  public add() {
    this.$store.commit(
      "openMenu",
      addFieldGenerator((field: FieldConfig) => {
        field.parent = this.config.parent;
        this.config.parent.fields.push(field);
      })
    );
  }
  deleteField() {
    this.$store.commit(
      "openMenu",
      deleteFieldGenerator((status: Status) => {
        for (let i = 0; i < this.config.parent.fields.length; i++) {
          const field = this.config.parent.fields[i];
          if (field === this.config) {
            this.config.parent.fields.splice(i, 1);
          }
        }
        // this.change();
      })
    );
  }
  editField() {
    this.$store.commit(
      "openMenu",
      editFieldGenerator(this.config, (field: FieldConfig) => {
        field.parent = this.config.parent;
        for (let i = 0; i < field.parent.fields.length; i++) {
          const f = field.parent.fields[i];
          if(f == this.config) {
            this.config.parent.fields[i] = field;
          }
        }
        this.onChange();
      })
    );
  }
  @Emit('change')
  onChange(): FieldConfig {
    return this.config;
  }
}
</script>

<style scoped lang="scss">
.field {
  padding: 24px;
  box-shadow: #00000045 0px 4px 10px;
  margin-bottom: 32px;
}
</style>

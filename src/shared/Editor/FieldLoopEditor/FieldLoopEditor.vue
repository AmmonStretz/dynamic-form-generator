<template>
  <div class="loop" :class="{ dark: !(depth % 2) }">
    <header>
      <h2>
        <span>Wiederholung: {{ config.key }}</span>
      </h2>
      <ElementMenu
        :listeners="{
          edit: [{ name: 'edit', click: editLoop }],
          delete: [{ name: 'delete', click: deleteLoop }],
        }"
      />
    </header>
    <div class="content">
      <FieldEditor
        v-if="config.field.type != 'fieldGroup'"
        :config="config.field"
        @change="onChange"
        :depth="depth + 1"
      />
      <FieldGroupEditor
        v-if="config.field.type == 'fieldGroup'"
        :config="config.field"
        @change="onChange"
        :depth="depth + 1"
      />
      <FieldLoopEditor
        v-if="config.field.type == 'fieldLoop'"
        :config="config.field"
        @change="onChange"
        :depth="depth + 1"
      />
    </div>
    <div v-if="!loaded"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { FieldConfig } from "../../DynamicForm/Field/Field.config";
import { FieldLoopConfig } from "../../DynamicForm/Field/FieldLoop/FieldLoop.config";
import { FormStatus } from "../../DynamicForm/Form/Form.config";
import { NumberCondition } from "../../ts-condition-parser/condition.class";
import ElementMenu from "../ElementMenu/ElementMenu.vue";
import FieldEditor from "../FieldEditor/FieldEditor.vue";
import FieldGroupEditor from "../FieldGroupEditor/FieldGroupEditor.vue";
import { editFieldLoopGenerator } from "./sidebar-menu.form";

@Component({
  name: "FieldLoopEditor",
  components: {
    ElementMenu,
    FieldEditor,
    FieldGroupEditor,
  },
})
export default class FieldLoopEditor extends Vue {
  @Prop() public config!: FieldLoopConfig;
  @Prop() public depth!: boolean;
  public $store: any;
  @Emit("change")
  onChange(): FieldLoopConfig {
    return this.config;
  }
  public deleteLoop() {
    
  }
  public editLoop() {
    this.$store.commit(
      "openMenu",
      editFieldLoopGenerator(
        this.config,
        (status: FormStatus) => {
          const key: string = status.getValueByKey("key");
          const counter: NumberCondition = status.getValueByKey("counter");

          if(key != null && counter != null){
            this.config.key = key;
            this.config.condition = counter;
          }

          this.reload();
          this.onChange();
        },
        this.config.Root.getAllPaths()
      )
    );
  }
  private loaded = true;
  reload() {
    this.loaded = false;
    this.$nextTick(() => {
      this.loaded = true;
    });
  }
}
</script>

<style scoped lang="scss">
.loop {
  padding: 16px;
  // box-shadow: #00000045 0px 4px 10px;
  border-radius: 4px;
  box-shadow: #00000026 0 3px 0 0px;
  background-color: white;
  &.dark {
    background: #eee;
  }
  header {
    display: flex;
    gap: 16px;
    height: 44px;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 24px;
      margin: 0;
    }
    &:not(:hover) .element-menu {
      display: none;
    }
  }
}
</style>

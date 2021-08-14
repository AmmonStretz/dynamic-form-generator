<template>
  <div class="field" :class="{ dark: !(depth % 2) }">
    <header>
      <h3>
        {{ config.type }}: <span>{{ config.settings.name }}</span>
      </h3>
      <ElementMenu
        :listeners="{
          add: [{ name: 'Feld', click: add },{ name: 'Gruppe', click: addGroup }],
          edit: [{ name: 'edit', click: editField }],
          delete: [{ name: 'delete', click: deleteField }],
          visibility: [{ name: 'visibility', click: editVisibility }],
        }"
      />
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { FieldConfig } from "../../DynamicForm/Field/Field.config";
import { FieldGroupConfig } from "../../DynamicForm/Field/FieldGroup/FieldGroup.config";
import { LogicInputConfig } from "../../DynamicForm/Field/ValueFields/LogicInput/LogicInput.config";
import { FormConfig, FormStatus } from "../../DynamicForm/Form/Form.config";
import { Status } from "../../DynamicForm/status";
import ElementMenu from "../ElementMenu/ElementMenu.vue";
import { addFieldGroupGenerator } from "../FieldGroupEditor/sidebar-menu.forms";
import {
  addFieldGenerator,
  deleteFieldGenerator,
  editFieldGenerator,
} from "./sidebar-menu.forms";

@Component({
  name: "FieldEditor",
  components: {
    ElementMenu,
  },
})
export default class FieldEditor extends Vue {
  @Prop() public config!: FieldConfig;
  @Prop() public depth!: boolean;
  public $store: any;
  public add() {
    this.$store.commit(
      "openMenu",
      addFieldGenerator(
        (status: FormStatus) => {
          const position: number = status.getValueByKey("position");
          const currentStatus =
            status.children[status.children.length - 1].children[
              status.getValueByKey("type")
            ];
          let field = (Vue as any).fieldPlugins[
            status.getValueByKey("type")
          ].editor.generator(currentStatus);

          let index = this.config.parent.fields.indexOf(this.config);
          field.parent = this.config.parent;
          if (position == 0) {
            this.config.parent.fields.splice(index, 0, field);
          } else if (position == 1) {
            this.config.parent.fields.splice(index + 1, 0, field);
          }
        },
        [
          { name: "vorher", value: 0 },
          { name: "nachher", value: 1 },
        ]
      )
    );
  }
  addGroup() {
    this.$store.commit(
      "openMenu",
      addFieldGroupGenerator(
        (status: FormStatus) => {
          const title: string = status.getValueByKey("title");
          const key: string = status.getValueByKey("key");
          const group: FieldGroupConfig = new FieldGroupConfig(key, [], {
            title: title,
          });
          const position: number = status.getValueByKey("position");

          let index = this.config.parent.fields.indexOf(this.config);
          group.parent = this.config.parent;
          if (position == 0) {
            this.config.parent.fields.splice(index, 0, group);
          } else if (position == 1) {
            this.config.parent.fields.splice(index + 1, 0, group);
          }
        },
        [
          { name: "vorher", value: 0 },
          { name: "nachher", value: 1 },
        ]
      )
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
          if (f == this.config) {
            this.config.parent.fields[i] = field;
          }
        }
        this.onChange();
      })
    );
  }
  editVisibility() {
    let view = {
      form: new FormConfig(
        [
          new LogicInputConfig("visibility", this.config.Root.getAllPaths(), {
            default: this.config.visible,
          }),
        ],
        { title: "Sichtbarkeit bearbeiten" }
      ),
      listener: (status: any) => {
        this.config.visible = status.getValueByKey("visibility");
        this.config.parent = this.config.parent;
        for (let i = 0; i < this.config.parent.fields.length; i++) {
          const f = this.config.parent.fields[i];
          if (f == this.config) {
            this.config.parent.fields[i] = this.config;
          }
        }
        this.onChange();
      },
    };
    this.$store.commit("openMenu", view);
  }
  @Emit("change")
  onChange(): FieldConfig {
    return this.config;
  }
}
</script>

<style scoped lang="scss">
.field {
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

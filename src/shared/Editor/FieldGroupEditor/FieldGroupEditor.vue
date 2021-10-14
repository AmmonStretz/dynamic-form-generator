<template>
  <div class="group" :class="{ dark: !(depth % 2) }">
    <header>
      <h2>
        Gruppe: <span>{{ config.settings.title }}</span>
      </h2>
      <ElementMenu
        :listeners="{
          add: [
            { name: 'Feld', click: addField },
            { name: 'Gruppe', click: addGroup },
          ],
          edit: [{ name: 'edit', click: editGroup }],
          delete: [{ name: 'delete', click: deleteGroup }],
          visibility: [{ name: 'visibility', click: editVisibility }],
        }"
      />
    </header>
    <div class="content">
      <div v-for="(field, i) in config.fields" :key="i">
        <FieldEditor
          v-if="field.type != 'fieldGroup'"
          :config="field"
          @change="onFieldChange"
          :depth="depth + 1"
        />
        <FieldGroupEditor
          v-if="field.type == 'fieldGroup'"
          :config="field"
          @change="onFieldChange"
          :depth="depth + 1"
        />
      </div>
      <div class="empty-content" v-if="config.fields.length == 0">
        <button @click="addField()">
          <img src="../../../assets/icons/add.svg" alt="" />
        </button>
      </div>
    </div>
    <div v-if="!loaded"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { FieldConfig } from "../../DynamicForm/Field/Field.config";
import { FieldGroupConfig } from "../../DynamicForm/Field/FieldGroup/FieldGroup.config";
import { BooleanLogicInputConfig } from "../../DynamicForm/Field/ValueFields/LogicInput/BooleanLogicInput/BooleanLogicInput.config";
import { FormConfig, FormStatus } from "../../DynamicForm/Form/Form.config";
import { Status } from "../../DynamicForm/status";
import FieldEditor from "../FieldEditor/FieldEditor.vue";
import { addFieldGenerator } from "../FieldEditor/sidebar-menu.forms";
import {
  addFieldGroupGenerator,
  deleteFieldGroupGenerator,
  editFieldGroupGenerator,
} from "./sidebar-menu.forms";
import ElementMenu from "../ElementMenu/ElementMenu.vue";

@Component({
  name: "FieldGroupEditor",
  components: {
    FieldEditor,
    ElementMenu,
  },
})
export default class FieldGroupEditor extends Vue {
  @Prop() public config!: FieldGroupConfig;
  @Prop() public depth!: boolean;

  public $refs: any;
  public $store: any;

  deleteGroup() {
    this.$store.commit(
      "openMenu",
      deleteFieldGroupGenerator((status: Status) => {
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

  editGroup() {
    this.$store.commit(
      "openMenu",
      editFieldGroupGenerator(this.config.settings.title, (status: any) => {
        let newSettings = this.config.settings;
        const title: string = status.getValueByKey("title");
        const key: string = status.getValueByKey("key");
        newSettings.title = title;
        this.config.key = key;
        this.config.settings = newSettings;
        this.change();
      })
    );
  }

  editVisibility() {
    let view = {
      form: new FormConfig(
        [
          new BooleanLogicInputConfig("visibility", this.config.Root.getAllPaths(), {
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
        this.change();
      },
    };
    this.$store.commit("openMenu", view);
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
          } else if (position == 2) {
            this.config.fields.push(group);
            group.parent = this.config;
          }
          this.change();
        },
        [
          { name: "vorher", value: 0 },
          { name: "innen", value: 2 },
          { name: "nachher", value: 1 },
        ]
      )
    );
  }

  onFieldChange(config: FieldConfig) {
    this.reload();
  }

  public addField() {
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

          if (position == 0) {
            field.parent = this.config.parent;
            this.config.parent.fields.splice(index, 0, field);
          } else if (position == 1) {
            field.parent = this.config.parent;
            this.config.parent.fields.splice(index + 1, 0, field);
          } else if (position == 2) {
            this.config.fields.push(field);
            field.parent = this.config;
          }
        },
        [
          { name: "vorher", value: 0 },
          { name: "innen", value: 2 },
          { name: "nachher", value: 1 },
        ]
      )
    );
  }

  @Emit("change")
  change() {
    return;
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
.group {
  padding: 24px;
  // box-shadow: #00000045 0px 4px 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: #00000026 0 3px 0 0px;
  &.dark {
    background: #eee;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-block: 16px;
    .empty-content {
      padding: 16px;
      border: black dotted 2px;
    }
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

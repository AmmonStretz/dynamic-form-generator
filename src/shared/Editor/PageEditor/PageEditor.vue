<template>
  <div class="page">
    <header>
      <h2>
        Seite {{ index + 1 }}: <span>{{ config.settings.title }}</span>
      </h2>
        <ElementMenu
          :listeners="{
            add: [{ name: 'Seite', click: addPage }, { name: 'Feld', click: addField }, { name: 'Gruppe', click: addGroup }],
            edit: [{ name: 'edit', click: editPage }],
            delete: [{ name: 'delete', click: deletePage }],
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
          :depth="0"
        />
        <FieldGroupEditor
          v-if="field.type == 'fieldGroup'"
          :config="field"
          @change="onFieldChange"
          :depth="0"
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
import { ChapterConfig } from "../../DynamicForm/Chapter/Chapter.config";
import { FieldConfig } from "../../DynamicForm/Field/Field.config";
import { LogicInputConfig } from "../../DynamicForm/Field/ValueFields/LogicInput/LogicInput.config";
import { FormConfig, FormStatus } from "../../DynamicForm/Form/Form.config";
import { Status } from "../../DynamicForm/status";
import FieldEditor from "../FieldEditor/FieldEditor.vue";
import FieldGroupEditor from "../FieldGroupEditor/FieldGroupEditor.vue";
import ElementMenu from "../ElementMenu/ElementMenu.vue";
import { addFieldGenerator } from "../FieldEditor/sidebar-menu.forms";
import {
  addPageGenerator,
  deletePageGenerator,
  editPageGenerator,
} from "./sidebar-menu.forms";
import { addFieldGroupGenerator } from "../FieldGroupEditor/sidebar-menu.forms";
import { FieldGroupConfig } from "../../DynamicForm/Field/FieldGroup/FieldGroup.config";

@Component({
  name: "PageEditor",
  components: {
    FieldEditor,
    FieldGroupEditor,
    ElementMenu,
  },
})
export default class PageEditor extends Vue {
  @Prop() public config!: FormConfig;
  @Prop() public index: number;

  public $refs: any;
  public $store: any;
  private updated = true;

  mounted() {}

  deletePage() {
    this.$store.commit(
      "openMenu",
      deletePageGenerator((status: Status) => {
        for (let i = 0; i < this.config.parent.pages.length; i++) {
          const chapter = this.config.parent.pages[i];
          if (chapter === this.config) {
            this.config.parent.pages.splice(i, 1);
          }
        }
        if (this.config.parent.pages.length == 0) {
          this.config.parent.addPage(new FormConfig([], {}));
        }
        this.change();
      })
    );
  }

  editPage() {
    this.$store.commit(
      "openMenu",
      editPageGenerator(this.config.settings.title, (status: any) => {
        let newSettings = this.config.settings;
        const title: string = status.getValueByKey("title");
        this.config.settings.title = title;
        this.config.settings = newSettings;
        this.change();
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
        for (let i = 0; i < this.config.parent.pages.length; i++) {
          const f = this.config.parent.pages[i];
          if (f == this.config) {
            this.config.parent.pages[i] = this.config;
          }
        }
        this.change();
      },
    };
    this.$store.commit("openMenu", view);
  }
  addPage() {
    this.$store.commit(
      "openMenu",
      addPageGenerator((status: Status) => {
        const title: string = status.getValueByKey("title");
        const position: number = status.getValueByKey("position");
        const config = new FormConfig([], { title });
        config.parent = this.config.parent;

        let index = (this.config.parent as ChapterConfig).pages.indexOf(
          this.config
        );
        if (position == 0) {
          (this.config.parent as ChapterConfig).pages.splice(index, 0, config);
        } else if (position == 1) {
          (this.config.parent as ChapterConfig).pages.splice(
            index + 1,
            0,
            config
          );
        }
        this.change();
      })
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
          group.parent = this.config;
          this.config.fields.push(group);
        },
        []
      )
    );
  }

  onFieldChange(config: FieldConfig) {
    this.reload();
  }

  public addField() {
    this.$store.commit(
      "openMenu",
      addFieldGenerator((status: FormStatus) => {
        const currentStatus =
          status.children[status.children.length - 1].children[
            status.getValueByKey("type")
          ];
        let field = (Vue as any).fieldPlugins[
          status.getValueByKey("type")
        ].editor.generator(currentStatus)

        field.parent = this.config;
        this.config.fields.push(field);
      }, [])
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
.page {
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 4px;
  background-color: white;
  box-shadow: #00000026 0 3px 0 0px;
  header {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    h2 {
      font-size: 24px;
      margin: 0;
    }
    &:not(:hover) .element-menu{
      display: none
    }
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
}
</style>

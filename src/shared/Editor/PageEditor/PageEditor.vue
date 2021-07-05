<template>
  <div class="page">
    <header>
      <h2>
        Seite {{ index + 1 }}: <span>{{ config.settings.name }}</span>
      </h2>
      <button @click="addNewPage()">
        <img src="../../../assets/icons/add.svg" alt="" />
      </button>
      <button @click="editPage()">
        <img src="../../../assets/icons/settings.svg" alt="" />
      </button>
      <button @click="deletePage()">
        <img src="../../../assets/icons/delete.svg" alt="" />
      </button>
    </header>
    <div class="content">
      <FieldEditorComponent
          v-for="(field, i) in config.fields"
          :key="i"
          :config="field"
          @change="onFieldChange"
        />
      <div class="empty-content" v-if="config.fields.length == 0">
      <button  @click="addField()">
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
import { FormConfig } from "../../DynamicForm/Form/Form.config";
import { Status } from "../../DynamicForm/status";
import FieldEditorComponent from '../FieldEditor/FieldEditor.vue';
import { addFieldGenerator } from "../FieldEditor/sidebar-menu.forms";
import {
  addPageGenerator,
  deletePageGenerator,
  editPageGenerator,
} from "./sidebar-menu.forms";

@Component({
  components: {
    FieldEditorComponent
  },
})
export default class PageEditorComponent extends Vue {
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
        // this.$store.commit("updateConfig", this.config.Root);
        // let index = (this.config.parent as ChapterConfig).pages.indexOf(
        //   this.config
        // );
        this.config.settings = newSettings;

        //this.updated = !this.updated;
        this.change();
      })
    );
  }
  addNewPage() {
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

  onFieldChange(config: FieldConfig) {
    this.reload();
  }

  public addField() {
    this.$store.commit(
      "openMenu",
      addFieldGenerator((field: FieldConfig) => {
        field.parent = this.config;
        this.config.fields.push(field);
      })
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
  padding: 24px;
  box-shadow: #00000045 0px 4px 10px;
  margin-bottom: 32px;
  .content {
    .empty-content {
      padding: 16px;
      border: black dotted 2px;
    }
  }
}
</style>

<template>
  <div class="chapter">
    <header class="root-header" v-if="config.isRoot">
      <button @click="createNewSubchapter()">
        <img src="../../../assets/icons/add.svg" alt="" />
      </button>
    </header>
    <header class="chapter-header" v-if="!config.isRoot">
      <h3 v-if="config.settings.title">
        {{ config.settings.title }}
      </h3>
      <div class="line">
        <button @click="createNewSubchapter()">
          <img src="../../../assets/icons/add.svg" alt="" />
        </button>
        <button @click="edit()">
          <img src="../../../assets/icons/settings.svg" alt="" />
        </button>
        <button @click="deleteChapter()">
          <img src="../../../assets/icons/delete.svg" alt="" />
        </button>
      </div>
    </header>
    <div class="content" v-if="loaded">
      <div class="chapter-list">
        <div
          class="chapter-box"
          v-for="(subChapter, i) in config.children"
          :key="i"
        >
          <!-- v-on:change="onChange" -->
          <ChapterEditorComponent
            v-bind:config="subChapter"
            :ref="i"
            @change="reload"
          ></ChapterEditorComponent>
        </div>
      </div>
      <div class="pages" v-if="config.children.length == 0">
        <PageEditorComponent
          v-for="(page, i) in config.pages"
          :key="'page_' + i"
          :index="i"
          :config="page"
          @change="reload"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ChapterConfig } from "../../DynamicForm/Chapter/Chapter.config";
import { FormConfig } from "../../DynamicForm/Form/Form.config";
import PageEditorComponent from "../PageEditor/PageEditor.vue";

import {
  addCathegoryGenerator,
  deleteCathegoryGenerator,
  editCathegoryGenerator,
} from "./sidebar-menu.forms";

@Component({
  name: "ChapterEditorComponent",
  components: {
    ChapterEditorComponent,
    PageEditorComponent,
  },
})
export default class ChapterEditorComponent extends Vue {
  @Prop() public config!: ChapterConfig;
  public $refs: any;
  public $store: any;

  createNewSubchapter() {
    let titles = [""];
    this.config.children.forEach(function (chapter: ChapterConfig) {
      titles.push(chapter.settings.title);
    });
    this.$store.commit(
      "openMenu",
      addCathegoryGenerator(
        this.config.settings.title,
        titles,
        (status: any) => {
          const title: string = status.getValueByKey("title");
          let position: number = status.getValueByKey("position");

          if (position == null || position == undefined) position = 1;
          const empty = new FormConfig([], {});
          if (this.config instanceof ChapterConfig) {
            const newChild = new ChapterConfig([], [], { title });
            if (position == 1) {
              // add inside
              if (this.config.pages.length > 0) {
                this.config.pages.forEach((page: FormConfig) => {
                  newChild.addPage(page);
                });
              } else {
                newChild.addPage(empty);
              }
              this.config.pages = [];
              this.config.addChapter(newChild);
            } else {
              let index = (
                this.config.parent as ChapterConfig
              ).children.indexOf(this.config);

              newChild.addPage(empty);
              if (position == 0) {
                // add before

                (this.config.parent as ChapterConfig).addChapter(
                  newChild,
                  index
                );
              } else if (position == 2) {
                // add after
                (this.config.parent as ChapterConfig).addChapter(
                  newChild,
                  index + 1
                );
              }
            }
          }
          this.change();
        },
        this.config.isRoot
      )
    );
  }
  deleteChapter() {
    this.$store.commit(
      "openMenu",
      deleteCathegoryGenerator((status: any) => {
        // this.event("delete");
        if (this.config.parent instanceof ChapterConfig) {
          for (let i = 0; i < this.config.parent.children.length; i++) {
            const chapter = this.config.parent.children[i];
            if (chapter === this.config) {
              this.config.parent.children.splice(i, 1);
            }
          }
          if (this.config.parent.children.length == 0) {
            // TODO: change status and config children and
            this.config.parent.pages = [new FormConfig([], {})];
            this.config.parent.createStatus();
          }
        }
        this.change();
      })
    );
  }
  edit() {
    let titles = [""];
    if (this.config.parent instanceof ChapterConfig) {
      this.config.parent.children.forEach((chapter: ChapterConfig) => {
        if (this.config.settings.title != chapter.settings.title) {
          titles.push(chapter.settings.title);
        }
      });
    }
    this.$store.commit(
      "openMenu",
      editCathegoryGenerator(
        this.config.settings.title,
        this.config.settings.showTitle,
        titles,
        (status: any) => {
          this.config.settings.title = status.getValueByKey("title");
          this.config.settings.showTitle = status.getValueByKey("showTitle");
          this.change();
        }
      )
    );
  }

  loaded = true;
  reload() {
    this.loaded = false;
    // TODO: Kapitel rerendering https://morioh.com/p/08963bf07353
    this.$nextTick(() => {
      this.loaded = true;
    });
  }
  @Emit("change")
  change() {
    return;
  }
}
</script>

<style scoped lang="scss">
.chapter {
  position: relative;
  // border: 1px solid;
  & > .content {
    padding: 16px 0 0 16px;
    .add-content {
      padding: 16px;
      border: 1px solid black;
    }
  }
  .root-header {
  }
  .chapter-header {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 16px;
    height: 56px;
    .drag {
      opacity: 0;
      cursor: pointer;
    }
    &:hover > .line > button {
      display: block;
    }
    &:hover > .drag {
      opacity: 1;
    }
    h3 {
      text-align: left;
      margin: 0;
    }
    .line {
      position: relative;
      justify-content: center;
      align-items: center;
      gap: 10px;
      display: flex;
      &::before {
        position: absolute;
        content: "";
        height: 3px;
        width: 100%;
        background-color: grey;
      }
      button {
        display: none;
        z-index: 100;
        padding: 10px;
        border: none;
        cursor: pointer;
        background-color: white;
        img {
          display: block;
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  .drop-area {
    border: 1px solid black;
  }
  .chapter-list {
    .chapter-box {
    }
  }
  .menu {
    position: absolute;
    right: -44px;
    top: 0;
  }
}
</style>

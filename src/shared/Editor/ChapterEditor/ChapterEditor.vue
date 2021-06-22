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
    <div class="content">
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
            @event="listener"
          ></ChapterEditorComponent>
        </div>
      </div>
      <div class="add-content" v-if="config.children.length == 0"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ChapterConfig } from "../../DynamicForm/Chapter/Chapter.config";

import {
  addCathegoryGenerator,
  deleteCathegoryGenerator,
  editCathegoryGenerator,
} from "./sidebar-menu.forms";

@Component({
  name: "ChapterEditorComponent",
  components: {
    ChapterEditorComponent,
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
          if (this.config instanceof ChapterConfig) {
            if (this.config.isRoot) {
              let newChild =new ChapterConfig(status.children[0].value, [], {
                title: status.children[0].value,
              })
              newChild.parent = this.config;
              
              this.config.children.push(
                newChild
              );
            } else {
              const newChild = new ChapterConfig(status.children[1].value, [], {
                title: status.children[1].value,
              });
              newChild.parent = this.config;
              if (status.children[0].value == 1) {
                this.config.children.push(newChild);
              } else {
                let index = (
                  this.config.parent as ChapterConfig
                ).children.indexOf(this.config);
                if (status.children[0].value == 0) {
                  (this.config.parent as ChapterConfig).children.splice(
                    index,
                    0,
                    newChild
                  );
                } else if (status.children[0].value == 2) {
                  (this.config.parent as ChapterConfig).children.splice(
                    index + 1,
                    0,
                    newChild
                  );
                }
              }
            }
          }
        },
        this.config.isRoot
      )
    );
  }
  deleteChapter() {
    let titles = [""];
    this.config.children.forEach(function (chapter: ChapterConfig) {
      titles.push(chapter.settings.title);
    });
    this.$store.commit(
      "openMenu",
      deleteCathegoryGenerator((status: any) => {
        this.event("delete");
      })
    );
  }
  edit() {
    let titles = [""];
    if(this.config.parent instanceof ChapterConfig){
      this.config.parent.children.forEach((chapter: ChapterConfig) => {
        if(this.config.settings.title != chapter.settings.title){
          titles.push(chapter.settings.title);
        }
      });
    }
    this.$store.commit(
      "openMenu",
      editCathegoryGenerator(
        this.config.settings.title,
        titles,
        (status: any) => {
          this.config.settings.title = status.children[0].value;
        }
      )
    );
  }
  @Emit("event")
  event(eventType: string): { type: string; target: ChapterConfig } {
    return { type: eventType, target: this.config };
  }
  listener(event: { type: string; target: ChapterConfig }) {
    if (event.type == "delete") {
      for (let i = 0; i < this.config.children.length; i++) {
        const chapter = this.config.children[i];
        if (chapter === event.target) {
          this.config.children.splice(i, 1);
        }
      }
    }
    if (event.type == "add-after") {
      console.log("add-after");
    }
    if (event.type == "add-before") {
      console.log("add-before");
    }
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

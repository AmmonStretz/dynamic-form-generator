<template>
  <div class="chapter">
    <h2 v-if="config.settings.title && config.settings.showTitle">
      {{ config.settings.title }}
    </h2>
    <div v-for="(subChapter, i) in config.children" :key="i">
      <!-- v-on:change="onChange" -->
      <ChapterComponent
        v-if="i == currentStatus.index"
        v-bind:config="subChapter"
        v-bind:status="status.children[i]"
        v-bind:root="root"
        :ref="'chapter_' + i"
        v-on:change="onChange"
      ></ChapterComponent>
    </div>
    <div v-for="(page, i) in config.pages" :key="i">
      <FormComponent
        v-if="i == currentStatus.index"
        v-bind:config="page"
        v-bind:status="status.pages[i]"
        v-bind:root="root"
        :ref="'page_' + i"
        v-on:change="onChange"
      ></FormComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { FinderConfig } from "../Finder/Finder.config";
import { FormConfig, FormStatus } from "../Form/Form.config";
import FormComponent from "../Form/Form.vue";
import { ChapterConfig, ChapterStatus } from "./Chapter.config";

@Component({
  name: "ChapterComponent",
  components: {
    FormComponent,
    ChapterComponent,
  },
})
export default class ChapterComponent extends Vue {
  @Prop() public config!: ChapterConfig;
  @Prop() public status!: ChapterStatus;
  @Prop() public root!: FinderConfig;
  public $refs: any;

  public get currentStatus() {
    return this.config.status;
  }
  get hasPages(): boolean {
    // TODO: abfangen wenn beides gesetzt
    return this.config.pages.length > 0;
  }
  get hasChildren(): boolean {
    // TODO: abfangen wenn beides gesetzt
    return this.config.children.length > 0;
  }
  previous(): boolean {
    if (this.hasPages) {
      if (this.config.status.index == 0) {
        return true;
      } else {
        this.config.status.index--;
      }
    } else if (this.hasChildren) {
      if (this.$refs["chapter_" + this.config.status.index][0].previous()) {
        if (this.config.status.index == 0) {
          return true;
        } else {
          this.config.status.index--;
        }
      }
    }
  }
  next(): boolean {
    let size = this.config.pages.length;
    let next = true;
    let validChild = true;
    this.root.status.update();
    if (this.hasChildren) {
      next = this.$refs["chapter_" + this.config.status.index][0].next();
      size = this.config.children.length;
      validChild =
        this.currentStatus.children[this.config.status.index].isValid;
    } else if (this.hasPages) {
      validChild =
        this.$refs["page_" + this.config.status.index][0].checkValidity();
    }
    if (next && this.config.status.index < size - 1) {
      if (validChild) {
        this.config.status.index++;
      } else {
        this.root.status.update(true);
      }
    } else if (next && this.config.status.index == size - 1) {
      return true;
    }
    return false;
  }

  @Emit("change")
  onChange(status: ChapterStatus | FormStatus): ChapterStatus {
    const index: number = this.currentStatus.index;
    if (this.hasChildren && status instanceof ChapterStatus) {
      this.config.children[index].status = status;
      this.config.status.children[index] = status;
    }
    if (this.hasPages && status instanceof FormStatus) {
      this.config.pages[index].status = status;
      this.config.status.pages[index] = status;
    }
    if (this.root) {
      this.root.status.update();
    }
    this.config.status.isValid = this.checkValidity();
    return this.config.status;
  }

  checkValidity(): boolean {
    if (this.hasPages) {
      for (let i = 0; i < this.config.pages.length; i++) {
        if (!(this.config.pages instanceof FormConfig)) {
          const status = this.config.pages[i].status;
          if (status.visible && !status.isValid) {
            return false;
          }
        }
      }
    } else if (this.hasChildren) {
      for (let i = 0; i < this.config.children.length; i++) {
        if (!(this.config.children instanceof ChapterConfig)) {
          const status = this.config.children[i].status;
          if (status.visible && !status.isValid) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
</script>

<style scoped lang="scss">
nav a {
  &.active {
    text-decoration: underline;
  }
  &.enabled {
    color: blue;
  }
}
</style>

<template>
  <div class="finder">
    <h1 v-if="config.settings.title">
      {{ config.settings.title }}
    </h1>
      <Chapter
        v-bind:config="config.chapter"
        v-bind:root="config"
        v-bind:status="status.chapter"
        v-on:change="onChange"
        ref="chapter"
      ></Chapter>
    <div>
      <button type="button" v-on:click="previous()">
        {{
          config.settings.prevButtonText
            ? config.settings.prevButtonText
            : "Zurück"
        }}
      </button>
      <button type="button" v-on:click="next()">
        {{
          config.settings.nextButtonText
            ? config.settings.nextButtonText
            : "Weiter"
        }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ChapterStatus } from "../Chapter/Chapter.config";
import Chapter from "../Chapter/Chapter.vue";
import { FinderConfig, FinderStatus } from "./Finder.config";

@Component({
  components: {
    Chapter,
  },
})
export default class Finder extends Vue {
  @Prop() public config!: FinderConfig;
  public status: FinderStatus = this.config.status;
  public $refs: any;

  public get currentStatus() {
    return this.config.status;
  }

  mounted() {
    this.status.update();
  }

  @Emit("change")
  onChange(status: ChapterStatus): FinderStatus {
    this.status.update();
    this.config.chapter.status = status;
    this.status.chapter = status;
    return this.config.status;
  }

  @Emit("submit")
  submit() {
    return this.config.status;
  }
  @Emit("cancel")
  cancel() {
    return this.config.status;
  }
  previous() {
    if(this.status.chapter.previous()) {
      this.cancel();
    }
  }
  next(): void {
    if (!!this.config.chapter) {
      this.status.update(true);
      if(this.status.chapter.next() && this.config.status.chapter.isValid) {
        this.submit();
      }
    }
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

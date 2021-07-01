<template>
  <div class="finder">
    <h1 v-if="config.settings.title">
      {{ config.settings.title }}
    </h1>
      <ChapterComponent
        v-if="loaded"
        v-bind:config="config.chapter"
        v-bind:root="config"
        v-on:change="onChange"
        ref="chapter"
      ></ChapterComponent>
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
import { ChapterConfig, ChapterStatus } from "../Chapter/Chapter.config";
import ChapterComponent from "../Chapter/Chapter.vue";
import { FinderConfig, FinderStatus } from "./Finder.config";

@Component({
  components: {
    ChapterComponent,
  },
})
export default class FinderComponent extends Vue {
  @Prop() public config!: FinderConfig;
  public $refs: any;

private loaded = true;
  public get currentStatus() {
    return this.config.status;
  }

  @Emit("change")
  onChange(status: ChapterStatus): FinderStatus {
    this.config.chapter.status = status;
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
    if(this.$refs.chapter.previous()) {
      this.cancel();
    }
  }
  next(): void {
    if (!!this.config.chapter) {
      this.reload();
      if(this.$refs.chapter.next() && this.config.status.chapter.isValid) {
        this.submit();
      }
    }
  }
  reload() {
    this.loaded = false;
    // TODO: Kapitel rerendering https://morioh.com/p/08963bf07353
    this.$nextTick(() => {
      this.loaded = true;
    });
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

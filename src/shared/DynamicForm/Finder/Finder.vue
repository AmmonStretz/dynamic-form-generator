<template>
  <div class="finder">
    <h1 v-if="config.settings.title">
      {{ config.settings.title }}
    </h1>
      <ChapterComponent
        v-bind:config="config.chapter"
        v-bind:root="config"
        v-on:change="onChange"
        ref="chapter"
      ></ChapterComponent>
    <div>
      <button type="button" v-on:click="onBefore()">
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

  public get currentStatus() {
    return this.config.status;
  }

  @Emit("change")
  onChange(status: ChapterStatus): FinderStatus {
    console.log(status);
    
    this.config.chapter.status = status;
    return this.config.status;
  }

  @Emit("submit")
  submit() {
    return this.config.status;
  }

  onBefore() {}
  next(): boolean {
    if (!!this.config.chapter) {
      this.$refs.chapter.next();
      return false;
    }
    return true;
  }
  reset() {
    // this.$refs.forEach(ref => {
    // });
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

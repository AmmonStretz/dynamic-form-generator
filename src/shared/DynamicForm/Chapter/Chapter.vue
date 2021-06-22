<template>
  <div class="chapter">
    <h2 v-if="config.settings.title">
      {{ config.settings.title }}
    </h2>
    <div v-for="(subChapter, i) in config.children" :key="i">
      <!-- v-on:change="onChange" -->
      <ChapterComponent
        v-if="i == currentStatus.index"
        v-bind:config="subChapter"
        :ref="i"
      ></ChapterComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { WizardStatus } from "../Wizard/Wizard.config";
import WizardComponent from "../Wizard/Wizard.vue";
import { ChapterConfig } from "./Chapter.config";

@Component({
  name: "ChapterComponent",
  components: {
    WizardComponent,
    ChapterComponent,
  },
})
export default class ChapterComponent extends Vue {
  @Prop() public config!: ChapterConfig;
  public $refs: any;

  public get currentStatus() {
    return this.config.status;
  }
  next(): boolean {
    if (this.config.children.length > 0) {
      if (this.config.status.index < this.config.children.length - 1) {
        const up = this.$refs[this.config.status.index][0].next();
        if (up) {
          this.config.status.index++;
          // reset index
        }
        return false;
      }
    }
    return true;
  }
  reset() {
    // this.$refs.forEach(ref => {
    // });
  }

  // @Emit("change")
  // onChange(status: WizardStatus): FinderStatus {
  //   this.config.wizards[this.config.status.index].status = status;
  //   return this.config.status;
  // }

  // @Emit("submit")
  // submit() {
  //   return this.config.status;
  // }

  // onBefore() {
  // }
  // onAfter() {
  // }
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

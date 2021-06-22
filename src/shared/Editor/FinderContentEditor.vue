<template>
  <div class="finder-editor">
    <h1 v-if="config.settings.title">
      {{ config.settings.title }}
    </h1>
    <ChapterEditorComponent
      v-bind:config="config.chapter"
      ref="chapter"
    ></ChapterEditorComponent>
    <!-- @event="listener" -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ChapterConfig } from "../DynamicForm/Chapter/Chapter.config";
import ChapterEditorComponent from "./ChapterEditor/ChapterEditor.vue";
import { FinderConfig } from "../DynamicForm/Finder/Finder.config";

@Component({
  components: {
    ChapterEditorComponent,
  },
})
export default class FinderContentEditorComponent extends Vue {
  @Prop() public config!: FinderConfig;
  public $refs: any;
  // public menuStructure: any = [
  //   {
  //     icon: "add",
  //     submenu: [],
  //   },
  //   {
  //     icon: "delete",
  //     listener: () => {},
  //   },
  // ];
  // @Emit("event")
  // event(eventType: string): {type: string, target: ChapterConfig} {
  //   return {type: eventType, target: this.config};
  // }
  // listener(event: { type: string; target: ChapterConfig }) {
  //   if (event.type == "delete") {
  //     if (this.config.chapters.length > 1) {
  //       for (let i = 0; i < this.config.chapters.length; i++) {
  //         const chapter = this.config.chapters[i];
  //         if (chapter === event.target) {
  //           this.config.chapters.splice(i, 1);
  //         }
  //       }
  //     } else {
  //       // TODO: dont show delete button
  //       console.log('errormessage');

  //     }
  //   }
  // }
}
</script>

<style scoped lang="scss">
.finder-editor {
  h1 {
  }
}
</style>

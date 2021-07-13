<template>
  <div class="finder-editor">
    <h1 v-if="config.settings.title">
      {{ config.settings.title }}
      <button @click="editFinder()">
        <img src="../../assets/icons/settings.svg" alt="" />
      </button>
    </h1>
    <ChapterEditor
      v-if="loaded"
      v-bind:config="config.chapter"
      ref="chapter"
      @change="reload"
    ></ChapterEditor>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { ChapterConfig } from "../DynamicForm/Chapter/Chapter.config";
import ChapterEditor from "./ChapterEditor/ChapterEditor.vue";
import { FinderConfig } from "../DynamicForm/Finder/Finder.config";
import { FormConfig } from "../DynamicForm/Form/Form.config";
import { TextInputConfig } from "../DynamicForm/Field/ValueFields/TextInput/TextInput.config";

@Component({
  components: {
    ChapterEditor,
  },
})
export default class FinderContentEditor extends Vue {
  @Prop() public config!: FinderConfig;
  public $refs: any;
  public $store: any;
  public loaded =  true;
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
  reload(){
    this.loaded = false;
    // TODO: Kapitel rerendering https://morioh.com/p/08963bf07353
    this.$nextTick(() => {
      this.loaded = true;
    });
  }
  editFinder() {
    this.$store.commit(
      "openMenu",
      this.editFinderGenerator()
    );
  }
  editFinderGenerator() {
  return {
    form: new FormConfig(
      [
        new TextInputConfig(
          "title",
          { name: "Titel", default: this.config.settings.title },
          []
        ),
      ],
      { title: "Fragestrecke bearbeiten" }
    ),
    listener: (status: any) => {
        let newSettings = this.config.settings;
        const title: string = status.getValueByKey("title");
        this.config.settings.title = title;
        this.config.settings = newSettings;
      },
  }
}
}
</script>

<style scoped lang="scss">
.finder-editor {
  h1 {
  }
}
</style>

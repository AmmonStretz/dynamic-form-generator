<template>
  <div class="editor">
    <div class="chapter-view">
      <FinderContentEditor :config="config" />
    </div>
    <SidebarMenu/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FinderConfig } from "../shared/DynamicForm/Finder/Finder.config";
import FormComponent from "../shared/DynamicForm/Form/Form.vue";
import FinderService from "../shared/DynamicForm/services/Finder.service";
import ChapterEditorComponent from "../shared/Editor/ChapterEditor/ChapterEditor.vue";
import SidebarMenu from "../shared/Editor/SidebarMenu/SidebarMenu.vue";
import FinderContentEditor from "../shared/Editor/FinderContentEditor.vue";
import { SidebarMenuConfig } from "../shared/Editor/SidebarMenu/SidebarMenu.config";

@Component({
  components: {
    ChapterEditorComponent,
    FormComponent,
    FinderContentEditor,
    SidebarMenu
  },
})
export default class Editor extends Vue {
  public config: FinderConfig = FinderService.finder;
  constructor() {
    super();
  }
  // public config: WizardConfig = this.generateWizard();

  // generateWizard(): WizardConfig {
  //   let wizard = WizardParser.parseFromJSON(config);
  //   wizard.createStatus();
  //   console.log(1,wizard);

  //   // INIT status or load from Cookie
  //   return wizard;
  // }

  // statusChange(status: WizardStatus) {}
  // cancel() {
  // }
  // submit(status: WizardStatus) {
  //   console.log("submit", status);
  // }
}
</script>

<style lang="scss">
.editor {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 400px;
  .chapter-view {
    overflow: auto;
    padding: 100px;
    .chapter-list {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .chapter-box {
        // border: 1px solid;
        margin-bottom: 10px;
      }
    }
  }
  aside {
    background-color: lightgray;
  }
}
</style>

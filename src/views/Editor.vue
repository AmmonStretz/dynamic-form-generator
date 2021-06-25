<template>
  <div class="editor">
    <div class="chapter-view">
      <button @click="log">print</button>
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
  public $store: any;
  get config(): FinderConfig{
    console.log(this.$store)
    return this.$store.getters.config;
  }

  constructor() {
    super();
  }
  mounted(){
    
  }
  log(){
    console.log(this.config);
  }
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

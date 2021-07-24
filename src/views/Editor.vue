<template>
  <div class="editor-view">
    <div class="chapter-view">
      <FinderContentEditor :config="config" />
    </div>
    <SidebarMenu/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FinderConfig } from "../shared/DynamicForm/Finder/Finder.config";
import SidebarMenu from "../shared/Editor/SidebarMenu/SidebarMenu.vue";
import FinderContentEditor from "../shared/Editor/FinderContentEditor.vue";

@Component({
  name: 'EditorView',
  components: {
    FinderContentEditor,
    SidebarMenu
  },
})
export default class EditorView extends Vue {
  public $store: any;
  get config(): FinderConfig{
    return this.$store.getters.config;
  }
}
</script>

<style lang="scss">
.editor-view {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 1fr;
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

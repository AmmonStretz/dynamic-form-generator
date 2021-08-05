<template>
  <div class="path-view">
      <SubPathView
        v-for="(subpath, j) in path.subpaths"
        :key="j"
        :path="subpath"
        :config="config"
        :ref="j"
      />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Path } from "../../DynamicForm/config";
import { FinderConfig } from "../../DynamicForm/Finder/Finder.config";
import SubPathView from "./SubPathView.vue";

@Component({
  name: "PathView",
  components: {
    SubPathView,
  },
})
export default class PathView extends Vue {
  @Prop() public path: Path;
  @Prop() public config: FinderConfig;
  public $refs: any;
}
</script>

<style scoped lang="scss">
.path-view {
    padding: 8px;
    text-align: left;
}
</style>

<template>
  <div class="subpath-view" :class="{ end: !!path.type }">
    <div v-if="!path.type">
      {{ path.name ? path.name : path.key ? path.key : "Leer" }}
    </div>
    <div v-if="path.type">
      {{ path.name ? path.name : path.key ? path.key : "Leer" }}: {{value}}
    </div>
    <div
      class="selector-content"
      v-if="path.subpaths && path.subpaths.length > 0"
    >
      <SubPathView
        v-for="(subpath, j) in path.subpaths"
        :key="j"
        :path="subpath"
        :config="config"
        :ref="j"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Path } from "../../DynamicForm/config";
import { FinderConfig } from "../../DynamicForm/Finder/Finder.config";

@Component({
  name: "SubPathView",
  components: {},
})
export default class SubPathView extends Vue {
  @Prop() public path: Path;
  @Prop() public config: FinderConfig;
  get value() {
    if(this.path.complete && this.config.status){
      if(this.path.type == 'boolean-var'){
        return this.config.status.getValueByKey(this.path.complete)? 'Wahr': 'Falsch';
      }
      return this.config.status.getValueByKey(this.path.complete);
    }
    
    return ''
  }
}
</script>

<style scoped lang="scss">
.subpath-view {
  display: flex;
  flex-direction: column;
  gap: 8px;
  & > .selector-content {
    padding-left: 8px;
  }
  &.subpath-view {
    font-size: 0.9rem;
    padding: 4px;
    &.end {
      cursor: pointer;
      font-weight: bold;
      font-size: 1rem;
    }
  }
}
</style>

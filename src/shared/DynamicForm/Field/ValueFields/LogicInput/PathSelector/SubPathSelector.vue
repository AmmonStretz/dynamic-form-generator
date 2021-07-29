<template>
  <div class="subpath-selector" :class="{ end: !!path.type }">
    <div v-if="!path.type">
      {{ path.name ? path.name : path.key ? path.key : "Leer" }}
    </div>
    <div v-if="path.type" @click="change()">
      {{ path.name ? path.name : path.key ? path.key : "Leer" }}
    </div>
    <div
      class="selector-content"
      v-if="path.subpaths && path.subpaths.length > 0"
    >
      <SubPathSelector
        v-for="(subpath, j) in validPaths"
        :key="j"
        :path="subpath"
        @change="change"
        :ref="j"
        :filter="filter"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Path } from "../../../../config";

@Component({
  name: "SubPathSelector",
  components: {},
})
export default class SubPathSelector extends Vue {
  @Prop() public path: Path;
  @Prop() public filter: string;

  @Emit("change")
  change(subpath?: { name: string; value: string; type: string }): {
    name: string;
    value: string;
    type: string;
  } {
    if (subpath) {
      return {
        name: subpath.name,
        value: this.path.key + "/" + subpath.value,
        type: subpath.type,
      };
    } else {
      return {
        name: this.path.name,
        value: this.path.key,
        type: this.path.type,
      };
    }
  }

  public get validPaths(): Path[] {
    return this.path.subpaths.filter(
      (path: Path) =>
        path.type == null || path.type == this.filter || !this.filter
    );
  }
}
</script>

<style scoped lang="scss">
.subpath-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
  & > .selector-content {
    padding-left: 8px;
  }
  &.subpath-selector {
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
